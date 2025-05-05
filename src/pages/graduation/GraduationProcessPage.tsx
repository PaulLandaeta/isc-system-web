import { ChangeEvent, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Student } from "../../models/studentInterface";
import { getPermissionById } from "../../services/permissionsService";
import { Permission } from "../../models/permissionInterface";
import { HasPermission } from "../../helper/permissions";
import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dataGridLocaleText from "../../locales/datagridLocaleEs";
import ContainerPage from "../../components/common/ContainerPage";
import ProcessForm from "../CreateGraduation/components/ProcessForm";

const GraduationProcessPage: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Student[] | []>([]);
  const [search, setSearch] = useState("");
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const studentsResponse = useLoaderData() as {
    data: Student[];
    message: string;
  };
  const { data: students } = studentsResponse;
  const navigate = useNavigate();
  const [createProcess, setCreateProcess] = useState<Permission>();

  useEffect(() => {
    (async () => {
      const response = await getPermissionById(3);
      setCreateProcess(response.data[0]);
    })();
  }, []);

  useEffect(() => {
    setFilteredData(
      students.filter((item) =>
        item.student_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, students]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const goToCreateProcessPage = () => {
    handleOpen();
  };

  const tableHeaders: GridColDef[] = [
    {
      field: "student_name",
      headerName: "Estudiante",
      headerAlign: "center",
      align: "center",
      flex: 1,
      hideable: false,
      minWidth: 120,
    },
    {
      field: "period",
      headerName: "Periodo",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "tutor_name",
      headerName: "Tutor",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "reviewer_name",
      headerName: "Revisor",
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
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div>
          {
            <IconButton
              color="primary"
              aria-label="ver"
              onClick={() => navigate(`/studentProfile/${params.row.id}`)}
            >
              <VisibilityIcon />
            </IconButton>
          }
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4">Procesos de Graduación</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Lista de procesos de graduación de los estudiantes
          </Typography>
        </Box>
        {HasPermission(createProcess?.name || "") && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpen}
            startIcon={<AddIcon />}
            sx={{ whiteSpace: "nowrap" }}
          >
            Nuevo Proceso
          </Button>
        )}
      </Stack>
        <Box className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between mb-4">
          <label htmlFor="table-search" className="sr-only">
            Buscar
          </label>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "0.75rem", 
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </Box>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Buscar por nombre de estudiante"
              value={search}
              onChange={handleSearchChange}
            />
          </Box>
        </Box>
      <Box sx={{ mb: 2, overflowX: "auto" }}>
        <Paper>
          <DataGrid
            autoHeight
            rows={filteredData}
            columns={tableHeaders}
            localeText={dataGridLocaleText}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            sx={{
              minWidth: 600,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#e5e7eb",
              },
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
              "& .MuiDataGrid-cell--editing": {
                boxShadow: "none !important",
              },
              "& .MuiDataGrid-cell.MuiDataGrid-cell--editing": {
                outline: "none !important",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "transparent",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "inherit !important",
              },
            }}
            classes={{
              root: "bg-white dark:bg-gray-800",
              columnHeader: "bg-gray-200 dark:bg-gray-800",
              cell: "bg-white dark:bg-gray-800",
              row: "bg-white dark:bg-gray-800",
              columnHeaderTitle: "!font-bold text-center",
            }}
          />
        </Paper>
      </Box>
      <ProcessForm isVisible={open} isClosed={handleClose} />
    </Box>
  );
};  

export default GraduationProcessPage;
