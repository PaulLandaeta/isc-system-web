import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const ErrorPage = () => {
  const location = useLocation();
  const fromRoleGuard = location.state?.fromRoleGuard;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (fromRoleGuard) {
      setOpen(true);
    }
  }, [fromRoleGuard]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-xl mt-2 text-gray-800">Página no encontrada</p>
      <p className="mt-4 text-gray-600">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link to="/" className="mt-6 text-blue-500 text-lg">
        Volver al inicio
      </Link>
      {fromRoleGuard && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity={"error"} sx={{ width: "100%" }}>
            No tienes permiso para acceder a esta página.
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default ErrorPage;
