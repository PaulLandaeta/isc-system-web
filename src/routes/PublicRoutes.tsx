import { Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ErrorPage from "../pages/ErrorPage";

const publicRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "forgotPassword",
    element: <LoginPage />,
  },
  {
    path: "/singup",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
];

export default publicRoutes;
