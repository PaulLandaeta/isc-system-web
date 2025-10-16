import { useEffect, useState } from "react";
import {
  Checkbox,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import * as XLSX from "xlsx";
import EventDetailsPage from "../../components/common/EventDetailsPage";
import { getSupervisorEventByIdService } from "../../services/eventsService";
import { useUserStore } from "../../store/store";
import { FullEvent } from "../../models/eventInterface";
interface StudentRow {
  id_intern: number;
  name: string;
  lastname: string;
  mothername: string;
  code: string;
  notes: string;
  attendance: boolean;
}

const ViewInternSupervisor = () => {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [event, setEvent] = useState<FullEvent>();
  const user = useUserStore((state) => state.user);
  const fetchFullEvent = async () => {
    try {
      if (!user) {
        console.error("Failed on user id");
        return;
      }
      const res = await getSupervisorEventByIdService(user?.id);
      setEvent(res);
      setStudents(res.interns);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFullEvent();
  }, []);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const updatedStudents = students.map((student) => {
      return student.id_intern === id ? { ...student, attendance: checked } : student;
    });
    setStudents(updatedStudents);
  };

  const handleObservationChange = (id: number, value: string) => {
    const updatedStudents = students.map((student) =>
      student.id_intern === id ? { ...student, notes: value } : student
    );
    setStudents(updatedStudents);
  };

  const handleExportToExcel = () => {
    const worksheetData = students.map((student) => ({
      Nombre: `${student.name} ${student.lastname} ${student.mothername}`,
      Código: student.code,
      Observaciones: student.notes,
      Asistencia: student.attendance ? "Sí" : "No",
    }));

    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asistentes");
    XLSX.writeFile(wb, "lista_asistentes_evento.xlsx");
  };

  return (
    event && (
      <EventDetailsPage event={event}>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Observaciones</TableCell>
                <TableCell>Asistencia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => {
                const fullName = `${student.name} ${student.lastname} ${student.mothername}`;
                return (
                  <TableRow key={student.id_intern}>
                    <TableCell>{fullName}</TableCell>
                    <TableCell>{student.code}</TableCell>
                    <TableCell>
                      <TextField
                        value={student.notes}
                        onChange={(e) => handleObservationChange(student.id_intern, e.target.value)}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={student.attendance}
                        onChange={(e) => handleCheckboxChange(student.id_intern, e.target.checked)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={handleExportToExcel}>
            Cerrar Registro
          </Button>
        </Grid>
      </EventDetailsPage>
    )
  );
};

export default ViewInternSupervisor;
