import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ContainerPage from "../../components/common/ContainerPage";
import { useUserStore } from "../../store/store";
import { getInternByUserIdService, getInternEvents } from "../../services/internService";
import { deleteInternFromEventService } from "../../services/eventsService";
import { EventInternsType } from "../../models/eventInterface";
import { InternsInformation } from "../../models/internsInterface";
import dataGridLocaleText from "../../locales/datagridLocaleEs";

interface RowData {
  id?: number;
  name: string;
  startDate: string;
  inscriptionPeriod: string;
  cancelPeriod: string;
  hours: string;
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDIENTE":
      return "#5F9EA0";
    case "ACEPTADO":
      return "#32CD32";
    case "SUSPLENTE":
      return "#000000";
    default:
      return "#FF0000";
  }
};

const MyEventsTable = () => {
  const statusTranslation = (status: string) => {
    const statusMap: Record<string, string> = {
      accepted: "ACEPTADO",
      rejected: "RECHAZADO",
      reserve: "SUSPLENTE",
      pending: "PENDIENTE",
    };
    return statusMap[status.toLowerCase()] || status;
  };
  const [internInfomation, setInternInfomation] = useState<InternsInformation>();
  const user = useUserStore((state) => state.user);
  const [events, setEvents] = useState<EventInternsType[]>();
  const [rows, setRows] = useState<RowData[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchMyEvents = async () => {
    if (internInfomation?.id_intern) {
      const res = await getInternEvents(internInfomation?.id_intern);
      if (res.success) {
        setEvents(res.data);
      }
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [internInfomation]);

  useEffect(() => {
    events &&
      setRows(
        events.map((event) => ({
          id: event.id,
          name: event.title,
          startDate: `${dayjs(event.start_date).format("DD/MM")} -${dayjs(event.end_date).format(
            "DD/MM"
          )}`,
          inscriptionPeriod: dayjs(event.registration_deadline).format("DD/MM"),
          cancelPeriod: `${
            dayjs(event.start_cancellation_date)?.format("DD/MM") ?? "N/A"
          } - ${dayjs(event.end_cancellation_date)?.format("DD/MM") ?? "N/A"}`,
          hours: `${event.duration_hours} horas`,
          status: statusTranslation(event.type),
        }))
      );
  }, [events]);

  const buttonStyle = {
    borderRadius: "5px",
    width: "120px",
    height: "30px",
    transition: "background-color 0.3s ease",
  };

  const statusButtonStyle = {
    ...buttonStyle,
    borderRadius: "30px",
    padding: "5px 10px",
    textTransform: "none" as const,
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre del Evento",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Fecha",
      flex: 1,
    },
    {
      field: "inscriptionPeriod",
      headerName: "Límite de inscripción",
      flex: 1,
    },
    {
      field: "cancelPeriod",
      headerName: "Periodo de Bajas",
      flex: 1,
    },
    {
      field: "hours",
      headerName: "Horas Becarias",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          onClick={() => handleDeleteClick(params.row.id)}
          style={{
            ...buttonStyle,
            backgroundColor: "#191970",
            color: "#FFFFFF",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#99c2ff")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#191970")}
        >
          Cancelar
        </Button>
      ),
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          style={{
            ...statusButtonStyle,
            backgroundColor: getStatusColor(params.row.status),
          }}
          disabled
        >
          {params.row.status}
        </Button>
      ),
    },
  ];

  const handleDeleteClick = (eventId: number) => {
    setSelectedEventId(eventId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const fetchIntern = async () => {
    try {
      const res = await getInternByUserIdService(user!.id);
      setInternInfomation(res.data);
    } catch (error) {
      console.error("Error fetching Intern:", error);
    }
  };

  useEffect(() => {
    fetchIntern();
  }, []);

  const handleConfirmDelete = async () => {
    if (!selectedEventId) return;
    if (internInfomation?.id_intern) {
      const res = await deleteInternFromEventService(selectedEventId, internInfomation.id_intern);
      if (res.success) {
        setAlert({
          severity: "success",
          message: `Evento eliminado con éxito.`,
        });
        fetchMyEvents();
      } else {
        setAlert({
          severity: "error",
          message: `No se pudo eliminar el evento. Por favor, intenta de nuevo más tarde.`,
        });
      }
    } else {
      setAlert({
        severity: "error",
        message: "No se encontró el ID del becario.",
      });
    }

    setSnackbarOpen(true);
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <div style={{ position: "relative", height: "100vh", paddingTop: "19px" }}>
        <ContainerPage
          title="Eventos actuales"
          subtitle="Administra y visualiza tus eventos"
          actions={<></>}
        >
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows || []}
              columns={columns}
              localeText={dataGridLocaleText}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              classes={{
                root: "bg-white dark:bg-gray-800",
                columnHeader: "bg-gray-200 dark:bg-gray-800 ",
                cell: "bg-white dark:bg-gray-800",
                row: "bg-white dark:bg-gray-800",
                columnHeaderTitle: "!font-bold text-center",
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </ContainerPage>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={(reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleDialogClose();
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
            Confirmar eliminación
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            style={{
              color: "#231F74",
              position: "absolute",
              right: 3,
              top: 11,
            }}
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center">
            ¿Estás seguro de eliminar este evento?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end", padding: "24px" }}>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              backgroundColor: "#231F74",
              color: "white",
              marginRight: 2,
              fontWeight: "bold",
              minWidth: "120px",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              minWidth: "120px",
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {alert && (
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={alert.severity} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default MyEventsTable;
