import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import { FormContainer } from "../../pages/CreateGraduation/components/FormContainer";
import { getProfessorRoles, getStudentRoles } from "../../services/roleService";
import SuccessDialog from "../common/SucessDialog";
import ErrorDialog from "../common/ErrorDialog";
import { putUser, createUserWIthRoles } from "../../services/usersService";
import { Role } from "../../models/roleInterface";
import { UserFormProps } from "../../models/userFormPropsInterface";
import { User } from "../../models/userInterface";

const CreateUserPage = ({ handleClose, openCreate, user = null }: UserFormProps) => {
  const [isSuccesOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const [studentRoles, setStudentRoles] = useState<Role[]>([]);
  const [professorRoles, setProfessorRoles] = useState<Role[]>([]);
  const [isTeacher, setIsTeacher] = useState<boolean>(user?.degree ? true : false);

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre completo es obligatorio"),
    lastname: Yup.string().required("El apellido es obligatorio"),
    mothername: Yup.string().required("El apellido materno es obligatorio"),
    email: Yup.string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es obligatorio"),
    phone: Yup.string()
      .matches(/^[0-9]{8}$/, "Ingrese un número de teléfono válido")
      .optional(),
    code: Yup.number().optional(),
    roles: Yup.array()
      .min(1)
      .max(2, "No puede tener más de 2 roles")
      .required("El usuario debe tener un rol"),
    degree: Yup.string().when({
      is: () => isTeacher,
      then: () => Yup.string().required("El título académico es obligatorio"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  const convertRoles = (user: User | null) => {
    if (!user) return [];
    const roles = [];
    const { rolesAndPermissions } = user;
    for (const key in rolesAndPermissions) roles.push(parseInt(key));
    return roles;
  };

  const form = useFormik({
    initialValues: {
      name: user?.name || "",
      code: user?.code || "",
      lastname: user?.lastname || "",
      mothername: user?.mothername || "",
      email: user?.email || "",
      phone: user?.phone || "",
      roles: convertRoles(user) || [],
      degree: user?.degree || "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const scholarshipRole = studentRoles.find((rol) => rol.name.toLowerCase() === "intern");
      const formUser = {
        ...values,
        role_id: isTeacher ? 2 : 3,
        isStudent: !isTeacher,
        is_scholarship: scholarshipRole
          ? values.roles.some((rol) => rol == scholarshipRole?.id)
          : false,
      };
      try {
        if (!user) {
          if (import.meta.env.DEV) console.log(formUser);
          await createUserWIthRoles(formUser);
        } else await putUser(user.id || 0, formUser);
        setIsSuccessOpen(true);
        resetForm();
      } catch (error) {
        if (import.meta.env.DEV) console.log(error);
        setIsErrorOpen(true);
      }
    },
  });

  const getRoleName = (id: number) => {
    const rol = studentRoles.concat(professorRoles).find((rol) => rol.id === id);
    if (!rol) return "admin";
    else return rol?.name;
  };

  const fetchRoles = async () => {
    const studentRoles = await getStudentRoles();
    setStudentRoles(studentRoles);

    const professorRoles = await getProfessorRoles();
    setProfessorRoles(professorRoles);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <Dialog open={openCreate} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4">{user ? "Editar usuario" : "Crear nuevo usuario"}</Typography>
        <Typography variant="body2" sx={{ fontSize: 14, color: "gray" }}>
          Ingrese los datos del {user && "nuevo"} usuario a continuación.
        </Typography>
      </DialogTitle>

      <FormContainer>
        <form onSubmit={form.handleSubmit}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6">Tipo de Usuario</Typography>
            <Grid container sx={{ padding: 2, justifyContent: "center" }} spacing={2}>
              <Grid item xs={5} md={6}>
                <Card variant="outlined">
                  <CardActionArea
                    onClick={() => {
                      form.setFieldValue("roles", []);
                      setIsTeacher(false);
                    }}
                  >
                    <CardContent
                      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                      <CardMedia>
                        <SchoolIcon sx={{ fontSize: 100 }} color="primary" />
                      </CardMedia>
                      <Typography>Estudiante</Typography>
                    </CardContent>
                    <Radio checked={!isTeacher} disabled={true} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={5} md={6}>
                <Card variant="outlined">
                  <CardActionArea
                    onClick={() => {
                      form.setFieldValue("roles", []);
                      setIsTeacher(true);
                    }}
                  >
                    <CardContent
                      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                      <CardMedia>
                        <WorkIcon sx={{ fontSize: 100 }} color="primary" />
                      </CardMedia>
                      <Typography>Docente</Typography>
                    </CardContent>
                    <Radio checked={isTeacher} disabled={true} />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
              Información del Usuario
            </Typography>
            <Grid container spacing={2} sx={{ padding: 2, justifyContent: "center" }}>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="name"
                      name="name"
                      label="Nombres"
                      fullWidth
                      value={form.values.name}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.name && Boolean(form.errors.name)}
                      helperText={form.touched.name && form.errors.name}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="lastname"
                      name="lastname"
                      label="Apellido Paterno"
                      variant="outlined"
                      fullWidth
                      value={form.values.lastname}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.lastname && Boolean(form.errors.lastname)}
                      helperText={form.touched.lastname && form.errors.lastname}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="mothername"
                      name="mothername"
                      label="Apellido Materno"
                      variant="outlined"
                      fullWidth
                      value={form.values.mothername}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.mothername && Boolean(form.errors.mothername)}
                      helperText={form.touched.mothername && form.errors.mothername}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="code"
                      name="code"
                      label="Codigo del Usuario"
                      variant="outlined"
                      fullWidth
                      value={form.values.code}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.code && Boolean(form.errors.code)}
                      helperText={form.touched.code && form.errors.code}
                      margin="normal"
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                </Grid>
                {isTeacher && (
                  <TextField
                    id="degree"
                    name="degree"
                    label="Título Académico"
                    variant="outlined"
                    fullWidth
                    select
                    value={form.values.degree}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.touched.degree && Boolean(form.errors.degree)}
                    helperText={form.touched.degree && form.errors.degree}
                    margin="normal"
                  >
                    <MenuItem value="">Seleccione un título</MenuItem>
                    <MenuItem value="Ing.">Ing.</MenuItem>
                    <MenuItem value="Msc">Msc.</MenuItem>
                    <MenuItem value="PhD">PhD.</MenuItem>
                  </TextField>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Divider flexItem sx={{ my: 2 }} />
          <Grid item md={12}>
            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
              Información Adicional
            </Typography>
            <Grid container spacing={2} sx={{ padding: 2, justifyContent: "center" }}>
              <Grid item xs={12} md={8}>
                <TextField
                  id="email"
                  name="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                  value={form.values.email}
                  onChange={form.handleChange}
                  error={form.touched.email && Boolean(form.errors.email)}
                  helperText={form.touched.email && form.errors.email}
                  margin="normal"
                  inputProps={{ maxLength: 50 }}
                />
                <TextField
                  id="phone"
                  name="phone"
                  label="Número de Teléfono"
                  variant="outlined"
                  fullWidth
                  value={form.values.phone}
                  onChange={form.handleChange}
                  error={form.touched.phone && Boolean(form.errors.phone)}
                  helperText={form.touched.phone && form.errors.phone}
                  margin="normal"
                  inputProps={{ maxLength: 8 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2, width: "100%" }}>
              Rol
            </Typography>
            <Grid container spacing={2} sx={{ padding: 2, justifyContent: "center" }}>
              <Grid item xs={12} md={8}>
                <FormControl fullWidth error={form.touched.roles && Boolean(form.errors.roles)}>
                  <InputLabel>Roles</InputLabel>
                  <Select
                    multiple
                    name="roles"
                    label="Roles"
                    value={form.values.roles}
                    onChange={(event) => {
                      form.setFieldValue("roles", event.target.value);
                    }}
                    onBlur={form.handleBlur}
                    input={<OutlinedInput label="Roles" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((roleId: number) => (
                          <Chip key={roleId} label={getRoleName(roleId)} />
                        ))}
                      </Box>
                    )}
                  >
                    {(isTeacher ? professorRoles : studentRoles).map((rol: Role) => (
                      <MenuItem key={rol.name} value={rol.id}>
                        {rol.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {form.touched.roles && form.errors.roles && (
                    <FormHelperText error={true}>{form.errors.roles}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 0.5,
                    maxWidth: 300,
                  }}
                >
                  {form.values.roles.map((roleId: number) => (
                    <Chip
                      key={roleId}
                      label={getRoleName(roleId)}
                      onDelete={() => {
                        const newRoles = form.values.roles.filter((r) => r !== roleId);
                        form.setFieldValue("roles", newRoles);
                      }}
                      deleteIcon={<CloseIcon />}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ paddingTop: 5 }}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                sx={{ marginRight: "20px" }}
              >
                CERRAR
              </Button>
              <Button variant="contained" color="primary" type="submit">
                GUARDAR
              </Button>
            </Grid>
          </Grid>
        </form>
        <SuccessDialog
          open={isSuccesOpen}
          onClose={() => {
            setIsSuccessOpen(false);
            handleClose();
          }}
          title={user ? "¡Usuario Actualizado!" : "¡Usuario Creado!"}
          subtitle={`El usuario ha sido ${user ? "actualizado" : "creado"} con éxito.`}
        />
        <ErrorDialog
          open={isErrorOpen}
          onClose={() => setIsErrorOpen(false)}
          title={"¡Vaya!"}
          subtitle={"Hubo un problema al crear el nuevo usuario. Intentelo de nuevo mas tarde"}
        />
      </FormContainer>
    </Dialog>
  );
};

export default CreateUserPage;
