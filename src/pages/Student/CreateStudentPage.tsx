import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormContainer } from "../CreateGraduation/components/FormContainer";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { createStudent } from "../../services/studentService";
import SuccessDialog from "../../components/common/SucessDialog";
import ErrorDialog from "../../components/common/ErrorDialog";
import { createIntern } from "../../services/internService";

const PHONE_ERROR_MESSAGE = "Ingrese un número de teléfono válido.";
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre completo es obligatorio"),
  lastname: Yup.string().required("El apellido es obligatorio"),
  mothername: Yup.string().required("El apellido materno es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  phone: Yup.string()
    .matches(/^[0-9]{8}$/, PHONE_ERROR_MESSAGE)
    .optional(),
  code: Yup.string().optional(),
  isIntern: Yup.boolean(),
  total_hours: Yup.number().when("isIntern", (isIntern, schema) => {
    return isIntern ? schema.required("Las horas becarias son obligatorias") : schema.nullable();
  }),
});

const CreateStudentPage = () => {
  const [open, setOpen] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const navigate = useNavigate();

  const handleBackNavigate = () => {
    navigate("/students");
  };

  const sucessDialogClose = () => {
    setSuccessDialog(false);
  };

  const errorDialogClose = () => {
    setErrorDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      mothername: "",
      email: "",
      phone: "",
      code: 0,
      isIntern: false,
      total_hours: 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { isIntern, total_hours, ...rest } = values;
        if (isIntern) {
          await createIntern({
            ...rest,
            total_hours,
            completed_hours: 0,
            pending_hours: 0,
          });
        } else {
          // @ts-ignore
          await createStudent(rest);
        }
        setMessage("Estudiante creado con éxito");
        setSeverity("success");
        setSuccessDialog(true);
        resetForm();
      } catch (error) {
        // @ts-ignore
        setMessage(error.response.data.message);
        setSeverity("error");
        setErrorDialog(true);
      }
    },
  });

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9]*$/.test(value)) {
      formik.setFieldValue("phone", value);
    }
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[0-9]*$/.test(value)) {
      formik.setFieldValue("code", value);
    }
  };

  return (
    <Grid container spacing={0} alignItems="center">
      <Grid container spacing={4} sx={{ padding: 2, position: "relative" }}>
        <IconButton
          onClick={handleBackNavigate}
          aria-label="back"
          sx={{ position: "absolute", left: 21, top: 60 }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <FormContainer>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h4">Crear Nuevo Estudiante</Typography>
              <Typography variant="body2" sx={{ fontSize: 14, color: "gray" }}>
                Ingrese los datos del estudiante a continuación.
              </Typography>
              <Divider flexItem sx={{ mt: 2, mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={3}>
                  <Typography variant="h6">Información del Estudiante</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="name"
                        name="name"
                        label="Nombres"
                        variant="outlined"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="lastname"
                        name="lastname"
                        label="Apellido Paterno"
                        variant="outlined"
                        fullWidth
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                        helperText={formik.touched.lastname && formik.errors.lastname}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="mothername"
                        name="mothername"
                        label="Apellido Materno"
                        variant="outlined"
                        fullWidth
                        value={formik.values.mothername}
                        onChange={formik.handleChange}
                        error={formik.touched.mothername && Boolean(formik.errors.mothername)}
                        helperText={formik.touched.mothername && formik.errors.mothername}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="code"
                        name="code"
                        label="Codigo de Estudiante"
                        variant="outlined"
                        fullWidth
                        value={formik.values.code}
                        onChange={handleCodeChange}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
                        margin="normal"
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider flexItem sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={3}>
                  <Typography variant="h6">Información Adicional</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="email"
                    name="email"
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    inputProps={{ maxLength: 50 }}
                  />
                  <TextField
                    id="phone"
                    name="phone"
                    label="Número de Teléfono"
                    variant="outlined"
                    fullWidth
                    value={formik.values.phone}
                    onChange={handlePhoneChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    margin="normal"
                    inputProps={{ maxLength: 8 }}
                  />
                </Grid>
              </Grid>
              <Divider flexItem sx={{ mt: 2, mb: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formik.values.isIntern}
                        onChange={(e) => formik.setFieldValue("isIntern", e.target.checked)}
                        name="isIntern"
                      />
                    }
                    label="Becarios"
                  />
                </Grid>
              </Grid>
            </Grid>
            {formik.values.isIntern && (
              <Grid item xs={12}>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="total_hours"
                      name="total_hours"
                      label="Horas Becario"
                      type="number"
                      value={formik.values.total_hours}
                      onChange={formik.handleChange}
                      error={formik.touched.total_hours && Boolean(formik.errors.total_hours)}
                      helperText={formik.touched.total_hours && formik.errors.total_hours}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    GUARDAR
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
        <SuccessDialog
          open={successDialog}
          onClose={sucessDialogClose}
          title={"¡Estudiante Creado!"}
          subtitle={"El estudiante ha sido creado con éxito."}
        />
        <ErrorDialog
          open={errorDialog}
          onClose={errorDialogClose}
          title={"¡Vaya!"}
          subtitle={message}
        />
      </FormContainer>
    </Grid>
  );
};

export default CreateStudentPage;
