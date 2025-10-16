import { FC } from "react";
import { Modal as MuiModal, Box, Button, Typography, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { DeleteRoleModalProps } from "../../models/deleteRoleModalPropsInterface";

import "./ModalStyle.css";

const DeleteRoleModal: FC<DeleteRoleModalProps> = ({
  roleName,
  isVisible,
  setIsVisible,
  onDelete,
}) => {
  const handleDelete = async () => {
    onDelete();
    setIsVisible(false);
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <MuiModal
      open={isVisible}
      onClose={toggleModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box className="modal-box">
        <IconButton sx={{ position: "absolute", top: 6, right: 6 }} onClick={toggleModal}>
          <CancelIcon color="primary" />
        </IconButton>
        <Typography id="delete-modal-title" variant="h5" align="center">
          Eliminar rol
        </Typography>
        <Typography
          id="delete-modal-description"
          variant="body1"
          sx={{ marginTop: "20px" }}
          align="center"
        >
          ¿Estás seguro de que deseas eliminar el rol <strong>{roleName}</strong>?
        </Typography>
        <Typography
          id="delete-modal-description"
          variant="body2"
          sx={{ marginTop: "20px" }}
          align="center"
          color="gray"
        >
          Si eliminas el rol no podrás recuperarlo
        </Typography>
        <Box display="flex" justifyContent="center" mt={2} sx={{ marginTop: "20px" }}>
          <Button variant="outlined" color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ marginLeft: "15px" }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default DeleteRoleModal;
