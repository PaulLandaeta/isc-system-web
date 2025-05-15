import { DataGrid, GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Box,
  useMediaQuery,
  Container,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ContainerPage from "../../components/common/ContainerPage";
import { deleteStudent, getStudents } from "../../services/studentService";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPermissionById } from "../../services/permissionsService";
import { HasPermission } from "../../helper/permissions";
import { Permission } from "../../models/permissionInterface";
import dataGridLocaleText from "../../locales/datagridLocaleEs";
import CreateStudentForm from "./CreateStudentForm";

const StudentPage = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const [,setIsSidebarVisible] = useState(true);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [addStudentPermission, setAddStudentPermission] = useState<Permission>();
  const [editStudentPermission, setEditStudentPermission] = useState<Permission>();
  const [deleteStudentPermission, setDeleteStudentPermission] = useState<Permission>();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [viewStudentReportPermission, setViewStudentReportPermission] =
    useState<Permission | null>();
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
    code: true,
    name: true,
    email: true,
    phone: true,
    actions: true,
  });

  useEffect(() => {
    if (isSmallScreen) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const response = await getPermissionById(13);
      setAddStudentPermission(response.data[0]);
      const deleteStudentResponse = await getPermissionById(14);
      setDeleteStudentPermission(deleteStudentResponse.data[0]);
      const editStudentResponse = await getPermissionById(15);
      setEditStudentPermission(editStudentResponse.data[0]);
      const viewStudentReportResponse = await getPermissionById(16);
      setViewStudentReportPermission(viewStudentReportResponse.data[0]);
    };
    fetchPermissions();
    fetchStudents();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código",
      description: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      resizable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Nombre Completo",
      description: "Nombre Completo",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      resizable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Correo",
      description: "Correo",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      resizable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "phone",
      headerName: "Celular",
      description: "Celular",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      resizable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Acciones",
      description: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          {HasPermission(viewStudentReportPermission?.name || "") && (
            <IconButton color="primary" aria-label="ver" onClick={() => handleView(params.row.id)}>
              <VisibilityIcon />
            </IconButton>
          )}
          {HasPermission(editStudentPermission?.name || "") && (
            <IconButton
              color="primary"
              aria-label="editar"
              onClick={() => handleEdit(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          )}
          {HasPermission(deleteStudentPermission?.name || "") && (
            <IconButton
              color="secondary"
              aria-label="eliminar"
              onClick={() => handleClickOpen(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ),
    },
  ];

  const handleCreateStudent = () => setOpenCreateModal(true);
  const handleCloseCreateStudent = () => setOpenCreateModal(false);

  const handleStudentCreated = () => {
    setOpenCreateModal(false);
    fetchStudents();
  };

  const fetchStudents = async () => {
    const students = await getStudents();
    setStudents(students.data);
    console.log(students);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleView = (id: number) => {
    navigate(`/profile/${id}`);
    console.log(`Ver estudiante con id: ${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-student/${id}`);
  };

  const handleClickOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (selectedId !== null) {
      try {
        await deleteStudent(selectedId);
        fetchStudents();
        console.log(`Eliminar estudiante con id: ${selectedId}`);
      } catch (error) {
        console.log(error);
      } finally {
        handleClose();
      }
    }
  };

  return (
    <Container
      sx={{
        marginLeft: { xs: -5, sm: 3 },
      }}
    >

    <ContainerPage
      title={"Estudiantes"}
      subtitle={"Lista de estudiantes"}
      actions={
        HasPermission(addStudentPermission?.name || "") && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateStudent}
            startIcon={<AddIcon />}
            disabled={!addStudentPermission}
            sx={{
              width: { xs: "120%", sm: "auto" },
              mb: { xs: 1, sm: 0 },
              mt: { xs: 5, sm: 0 },
               fontSize: { xs: "0.5rem", sm: "1rem" },
              marginLeft: { xs: 2, sm: 2 },
            }}
          >
            Agregar Estudiante
          </Button>
        )
      }
      children={
          <Box
            sx={{
              width: "100%",
              height: { xs: "auto", sm: "100%" },
              ml: { xs: 5, sm: 0 },
            }}
          >
          <DataGrid
            rows={students}
            columns={columns}
            localeText={dataGridLocaleText}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => {
              const updatedModel = {
                ...newModel,
                code: true,
              };
              const visibleColumns = Object.values(updatedModel).filter(Boolean).length;
              if (visibleColumns === 0) {
                return;
              }
              setColumnVisibilityModel(updatedModel);
            }}
            classes={{
              root: "bg-white dark:bg-gray-800",
              columnHeader: "bg-gray-200 dark:bg-gray-800",
              cell: "bg-white dark:bg-gray-800",
              row: "bg-white dark:bg-gray-800",
              columnHeaderTitle: "!font-bold text-center",
            }}
            sx={{
              "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
                border: "none !important",
                boxShadow: "none !important",
              },
              "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
                outline: "none !important",
                border: "none !important",
                boxShadow: "none !important",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "transparent",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "inherit !important",
              },
                fontSize: { xs: "0.8rem", sm: "1rem" },
                marginLeft: { xs: "-40px", sm: "-40px" },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Estás seguro de que deseas eliminar este estudiante? Esta acción no se puede
                deshacer.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleDelete} color="secondary" autoFocus>
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
          <Modal open={openCreateModal} onClose={handleCloseCreateStudent}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: '80%',
                maxWidth: '100vh',
                maxHeight: "80vh",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                overflowY: "auto",
                p: 4
              }}
            >
              <CreateStudentForm onSuccess={handleStudentCreated} />
            </Box>
          </Modal>
        </Box>
      }
    ></ContainerPage>
    </Container>
  );
};

export default StudentPage;
