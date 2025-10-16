import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chip, TextField } from "@mui/material";
import { FullEvent } from "../../models/eventInterface";
import EventDetailsPage from "../../components/common/EventDetailsPage";
import { getFullEventInformationService, updateInternType } from "../../services/eventsService";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import dataGridLocaleText from "../../locales/datagridLocaleEs";

const EventRegisterPage = () => {
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [event, setEvent] = useState<FullEvent>();
  const [students, setStudents] = useState<any[]>([]);
  const [editHoursOpen, setEditHoursOpen] = useState(false);
  const [newHours, setNewHours] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { id_event } = useParams<{ id_event: string }>();

  const fetchFullEvent = async () => {
    const res = id_event && (await getFullEventInformationService(id_event));
    if (res.success) {
      setEvent(res.data);
    }
  };

  const setupStudents = () => {
    const studentList =
      event &&
      event.interns.map((intern) => ({
        id: intern.id_intern,
        name: `${intern.name} ${intern.lastname} ${intern.mothername}`,
        code: intern.code,
        time: dayjs(intern.registration_date).format("DD/MM/YYYY HH:mm"),
        status: intern.type,
        hours: intern.worked_hours.toString(),
      }));
    setStudents(studentList || []);
  };

  useEffect(() => {
    fetchFullEvent();
  }, [id_event]);

  useEffect(() => {
    setupStudents();
  }, [event]);

  const handleAddStudentOpen = () => {
    setAddStudentOpen(true);
  };

  const handleAddStudentClose = () => {
    setAddStudentOpen(false);
  };

  const handleSelectStudent = (id: number) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAddStudents = () => {
    handleAddStudentClose();
  };

  const availableStudents = students;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre del becario/a",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Hora de registro",
      type: "string",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Estado",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        const statusMap: { [key: string]: any } = {
          pending: { label: "PENDIENTE", color: "default" },
          accepted: { label: "ACEPTADO", color: "success" },
          reserve: { label: "RESERVA", color: "info" },
          rejected: { label: "RECHAZADO", color: "error" },
        };

        const status = statusMap[params.value];

        return <Chip label={status.label} color={status.color} sx={{ fontWeight: 600 }} />;
      },
    },
    {
      field: "hours",
      headerName: "Horas Becarias",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => `${params.value} horas`,
    },
    {
      field: "edit",
      headerName: "Editar",
      headerAlign: "center",
      align: "center",
      flex: 1,

      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleEditHoursOpen(params.row.id, params.row.hours)}
        >
          Editar
        </Button>
      ),
    },
  ];
  const handleHoursSave = async () => {
    if (!id_event || !selectedId) {
      console.error("Error on ids");
      return;
    }
    try {
      await updateInternType(parseInt(id_event), selectedId, {
        worked_hours: parseInt(newHours),
      });
    } catch (error) {
      console.error(error);
    }
    fetchFullEvent();
    setEditHoursOpen(false);
    setSelectedId(null);
  };

  const handleEditHoursOpen = (id: number, currentHours: string) => {
    setSelectedId(id);
    setNewHours(currentHours);
    setEditHoursOpen(true);
  };

  const handleEditHoursClose = (_?: object, reason?: string) => {
    if (reason && reason === "backdropClick") return;
    setEditHoursOpen(false);
    setSelectedId(null);
  };
  return (
    <div style={{ position: "relative", height: "100vh", padding: "19px" }}>
      <IconButton
        onClick={() => window.history.back()}
        aria-label="back"
        style={{
          position: "absolute",
          top: "17px",
          left: "5px",
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddStudentOpen}
        startIcon={<AddIcon />}
        style={{
          position: "absolute",
          top: "17px",
          right: "17px",
          zIndex: 1,
          backgroundColor: "#005b8f",
          color: "#fff",
        }}
      >
        Agregar Estudiante
      </Button>
      {event && (
        <EventDetailsPage
          event={event}
          children={
            <div style={{ marginTop: "60px", height: 400, width: "100%" }}>
              <DataGrid
                rows={students}
                columns={columns}
                localeText={dataGridLocaleText}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                classes={{
                  root: "bg-white dark:bg-gray-800",
                  columnHeader: "bg-gray-200 dark:bg-gray-800",
                  cell: "bg-white dark:bg-gray-800",
                  row: "bg-white dark:bg-gray-800",
                  columnHeaderTitle: "!font-bold text-center whitespace-normal p-2",
                }}
              />
              <Dialog
                open={addStudentOpen}
                onClose={handleAddStudentClose}
                aria-labelledby="add-student-dialog-title"
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle id="add-student-dialog-title">
                  Agregar Nuevo Becario
                  <IconButton
                    aria-label="close"
                    onClick={handleAddStudentClose}
                    style={{
                      color: "#231F74",
                      position: "absolute",
                      right: 7,
                      top: 10,
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    style={{ marginTop: "8px" }}
                  >
                    Selecciona los becarios para agregar
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  {availableStudents.length > 0 ? (
                    availableStudents.map((student) => (
                      <MenuItem
                        key={student.id}
                        onClick={() => handleSelectStudent(student.id)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>{student.name}</Typography>
                        <Checkbox checked={selectedStudents.includes(student.id)} color="primary" />
                      </MenuItem>
                    ))
                  ) : (
                    <Typography>No hay becarios disponibles para agregar.</Typography>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleAddStudentClose}
                    style={{
                      backgroundColor: "#231F74",
                      color: "#fff",
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddStudents}
                    style={{
                      backgroundColor: "#d32f2f",
                      color: "#fff",
                    }}
                  >
                    Agregar
                  </Button>
                </DialogActions>
              </Dialog>
              <ConfirmDialog
                open={editHoursOpen}
                onClose={handleEditHoursClose}
                onConfirm={handleHoursSave}
                title={"Editar horas becarias"}
                description={"Ingrese el nuevo valor asignado"}
              >
                <TextField
                  type="text"
                  value={newHours}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && (value === "" || parseInt(value) <= 168)) {
                      setNewHours(value);
                    }
                  }}
                  label="Horas Becarias"
                  margin="normal"
                  sx={{ marginRight: 2, marginLeft: 2 }}
                  inputProps={{ min: 0, inputMode: "numeric" }}
                />
              </ConfirmDialog>
            </div>
          }
        />
      )}
    </div>
  );
};

export default EventRegisterPage;
