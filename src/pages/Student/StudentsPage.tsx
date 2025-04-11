import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
} from "@mui/material";
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

const StudentPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [addStudentPermission, setAddStudentPermission] = useState<Permission>();
  const [editStudentPermission, setEditStudentPermission] = useState<Permission>();
  const [deleteStudentPermission, setDeleteStudentPermission] = useState<Permission>();
  const [viewStudentReportPermission, setViewStudentReportPermission] = useState<Permission>();
  
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

  const baseColumns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nombre Completo",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Correo",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Celular",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <div>
          {HasPermission(viewStudentReportPermission?.name || "") && (
            <IconButton
              color="primary"
              aria-label="ver"
              onClick={() => handleView(params.row.id)}
            >
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

  const columns: GridColDef[] = baseColumns.map(col => ({
    ...col,
    sortable: false,
    filterable: false,
  }));

  return (
    <ContainerPage
      title={"Estudiantes"}
      subtitle={"Lista de estudiantes"}
      actions={
        HasPermission(addStudentPermission?.name || "") && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/create-student")}
            startIcon={<AddIcon />}
            disabled={!addStudentPermission}
          >
            Agregar Estudiante
          </Button>
        )
      }
      children={
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={students}
            columns={columns}
            localeText={dataGridLocaleText}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            classes={{
              root: "bg-white dark:bg-gray-800",
              columnHeader: "bg-gray-200 dark:bg-gray-800",
              cell: "bg-white dark:bg-gray-800",
              row: "bg-white dark:bg-gray-800",
              columnHeaderTitle: "!font-bold text-center",
            }}
            pageSizeOptions={[5, 10]}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmar eliminación"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Estás seguro de que deseas eliminar este estudiante? Esta
                acción no se puede deshacer.
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
        </div>
      }
    />
  );
};

export default StudentPage;
