import { ChangeEvent, FC, useCallback, useState } from "react";
import {
  Modal as MuiModal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Radio,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import AddTextModalProps from "../../models/addTextModalPropsInterface";

import "./ModalStyle.css";

const AddTextModal: FC<AddTextModalProps> = ({
  isVisible,
  setIsVisible,
  onCreate,
  existingRoles,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);

  const handleCreate = useCallback(async () => {
    let rolWithTheSameName = false;
    existingRoles.forEach((role) => {
      if (name && role.name.toLowerCase() === name.toLowerCase()) {
        rolWithTheSameName = true;
      }
    });

        const nameRegex = /^[a-zA-Z]{4,16}$/;
    const isValidName = nameRegex.test(name.trim());

    if (!name.trim()) {
      setError("El nombre del rol no puede estar vacío");
    } else if (!isValidName) {
      setError(
        "El nombre debe tener entre 4 y 16 letras (sin espacios, números o caracteres especiales)"
      );
    } else if (rolWithTheSameName) {
      setError("Rol existente");
    } else {
      onCreate(name.trim(), isTeacher ? "professor" : "student");
      setIsVisible(false);
      setName("");
      setError(null);
    }
  }, [name, isTeacher, existingRoles, onCreate, setIsVisible]);

  const toggleModal = useCallback(() => {
    setIsVisible(!isVisible);
    setName("");
    setError(null);
  }, [isVisible, setIsVisible]);

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      if (error) {
        setError(null);
      }
    },
    [error]
  );

  const handleStudentSelect = useCallback(() => {
    setIsTeacher(false);
  }, []);

  const handleTeacherSelect = useCallback(() => {
    setIsTeacher(true);
  }, []);

  return (
    <MuiModal
      open={isVisible}
      onClose={toggleModal}
      aria-labelledby="create-modal-title"
      aria-describedby="create-modal-description"
    >
      <Box className="modal-box">
        <IconButton sx={{ position: "absolute", top: 6, left: 450 }} onClick={toggleModal}>
          <CancelIcon color="primary" />
        </IconButton>
        <Typography id="create-modal-title" variant="h5">
          {"Crear nuevo rol\r"}
        </Typography>
        <TextField
          fullWidth
          value={name}
          onChange={handleNameChange}
          label="Ingresa el nombre del nuevo rol"
          placeholder="Solo letras, 4-16 caracteres"
          variant="outlined"
          inputProps={{ maxLength: 16 }}
          sx={{ marginTop: "20px" }}
          error={!!error}
          helperText={error}
        />

        <Box sx={{ textAlign: "center", paddingTop: 2 }}>
          <Typography variant="h6">{"¿A quién puedo asignar este rol?"}</Typography>
          <Grid container sx={{ padding: 2, justifyContent: "center" }} spacing={2}>
            <Grid item xs={5} md={6}>
              <Card variant="outlined">
                <CardActionArea onClick={handleStudentSelect}>
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <CardMedia>
                      <SchoolIcon sx={{ fontSize: 100 }} color="primary" />
                    </CardMedia>
                    <Typography>{"Estudiante"}</Typography>
                  </CardContent>
                  <Radio checked={!isTeacher} disabled={true} />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={5} md={6}>
              <Card variant="outlined">
                <CardActionArea onClick={handleTeacherSelect}>
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <CardMedia>
                      <WorkIcon sx={{ fontSize: 100 }} color="primary" />
                    </CardMedia>
                    <Typography>{"Docente"}</Typography>
                  </CardContent>
                  <Radio checked={isTeacher} disabled={true} />
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2} sx={{ marginTop: "20px" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={toggleModal}
            sx={{ marginRight: "10px" }}
          >
            {"Cancelar\r"}
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            {"Crear\r"}
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default AddTextModal;
