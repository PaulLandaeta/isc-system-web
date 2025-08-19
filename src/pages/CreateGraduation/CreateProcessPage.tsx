import { FormContainer } from "./components/FormContainer";
import ProcessForm from "./components/ProcessForm";
import React, { useState } from "react";

const CreateProcessPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <FormContainer>
      <button onClick={handleOpenModal}>Abrir proceso</button>
      <ProcessForm isVisible={openModal} isClosed={handleCloseModal} />
    </FormContainer>
  );
};

export default CreateProcessPage;
