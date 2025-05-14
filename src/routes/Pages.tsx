import CreateProcessPage from "../pages/CreateGraduation/CreateProcessPage";
import CreateEventPage from "../pages/Events/CreateEventPage";
import EventsPage from "../pages/Events/EventsPage";
import UpdateEventForm from "../pages/Events/UpdateEventForm";
import GraduationProcessPage from "../pages/graduation/GraduationProcessPage";
import ProcessInfoPage from "../pages/graduation/ProcessInfoPage";
import InternsListPage from "../pages/interns/InternsListPage";
import CreateProfessorPage from "../pages/Professor/CreateProfessorPage";
import ProfessorPage from "../pages/Professor/ProfessorPage";
import Profile from "../pages/profile/Profile";
import CreateStudentPage from "../pages/Student/CreateStudentPage";
import EditStudentPage from "../pages/Student/EditStudentPage";
import StudentPage from "../pages/Student/StudentsPage";
import HoursPage from "../pages/ScholarshipHours/HoursPage";
import EventTable from "../pages/Events/EventTable";
import CompleteScholarshipHourPage from "../pages/CompleteScholarshipHour/CompleteScholarshipHourPage";
import MyEventsTable from "../pages/interns/MyEventsTable";
import UsersPage from "../pages/Users/UsersPage";
import AdministratorPage from "../pages/Administrator/AdministratorPage";
import ViewInternSupervisor from "../pages/supervisor/ViewInternSupervisor";
import EventsByInternsPage from "../pages/interns/EventsByInterns";
import EventRegisterPage from "../pages/Events/EventRegisterPage";
import EditProfessorPage from "../pages/Professor/EditProfessorPage";



export const pages: Record<string, React.FC> = {
  "/createProcess": CreateProcessPage,
  "/events/create": CreateEventPage,
  "/events": EventsPage,
  "/editEvent/:id_event": UpdateEventForm,
  "/process": GraduationProcessPage,
  "/studentProfile/:id": ProcessInfoPage,
  "/interns/:id_event": InternsListPage,
  "/create-professor": CreateProfessorPage,
  "/professors": ProfessorPage,
  "/profile": Profile,
  "/profile/:id": Profile,
  "/create-student": CreateStudentPage,
  "/edit-student/:id": EditStudentPage,
  "/students": StudentPage,
  "/scholarshipHours": HoursPage,
  "/programDirector": EventTable,
  "/CompleteScholarshipHour": CompleteScholarshipHourPage,
  "/myEvents": MyEventsTable,
  "/users": UsersPage,
  "/administration": AdministratorPage,
  "/supervisor": ViewInternSupervisor,
  "/eventsByInterns": EventsByInternsPage,
  "/eventRegisters/:id_event": EventRegisterPage,
  "/edit-professor/:id": EditProfessorPage,
};