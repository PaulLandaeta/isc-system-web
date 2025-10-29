import { FC, useCallback, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Box, Button, Grid, Alert, AlertTitle, Snackbar, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import StageTitle from "./StageTitle";
import StageContainer from "./StageContainer";

import MentorSelection from "./MentorSelection";
import DateSelection from "./DateSelection";
import DocumentCheckbox from "./DocumentCheckbox";
import LoadingBackdrop from "../common/LoadingBackdrop";
import ConfirmModal from "../common/ConfirmModal";
import steps from "../../data/steps";
import { useProcessStore } from "../../store/store";
import { updateProcess } from "../../services/processServicer";
import { useCarrerStore } from "../../store/carrerStore";
import useMentorFormik from "../../hooks/useMentorFormik";
import STAGE from "../../constants/stages";

const CURRENT_STAGE = STAGE.MENTOR;

interface InternalDefenseStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

const MentorStage: FC<InternalDefenseStageProps> = ({ onPrevious, onNext }) => {
  const process = useProcessStore((state) => state.process);
  const carrer = useCarrerStore((state) => state.carrer);
  const setProcess = useProcessStore((state) => state.setProcess);

  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>((process?.stage_id ?? 0) !== CURRENT_STAGE);
  const isBlocked = (process?.stage_id ?? 0) !== CURRENT_STAGE; 
  const [showWarningSnackbar, setShowWarningSnackbar] = useState<boolean>(false);

  const { formik, canApproveStage } = useMentorFormik(process, () => {
    if (canApproveStage) {
      setShowModal(true);
    } else {
      // saveStage will be defined below
    }
  });

  const saveStage = useCallback(async () => {
    if (!process) return;
    if ((process?.stage_id ?? 0) !== CURRENT_STAGE) return;

    setLoading(true);

    const { mentor, mentorName, tutorDesignationLetterSubmitted, date_tutor_assignament } =
      formik.values;

    const updatedProcess = {
      ...process,
      tutor_letter: tutorDesignationLetterSubmitted,
      tutor_approval: formik.values.tutorApprovalLetterSubmitted,
      tutor_id: Number(mentor),
      tutor_name: mentorName,
      date_tutor_assignament: date_tutor_assignament ? dayjs(date_tutor_assignament) : null,
      ...(canApproveStage && {
        stage_id: 2,
        tutor_approval: true,
        tutor_approval_date: dayjs(),
      }),
    };
    try {
      await updateProcess(updatedProcess);
      setProcess(updatedProcess);
      if (canApproveStage) {
        onNext();
      }
    } catch (error) {
      // Error updating process
    } finally {
      setLoading(false);
    }
  }, [process, formik.values, setProcess, onNext, canApproveStage]);

  const handleModalAction = useCallback(() => {
    saveStage();
    setShowModal(false);
  }, [saveStage]);

  const handleWarningSnackbarClose = () => {
    setShowWarningSnackbar(false);
  };

  const renderFieldError = useCallback(
    (fieldName: string) => {
      const touched = formik.touched[fieldName as keyof typeof formik.touched];
      const error = formik.errors[fieldName as keyof typeof formik.errors];
      return touched && error ? (
        <Typography color="error" variant="caption">
          {String(error)}
        </Typography>
      ) : null;
    },
    [formik.touched, formik.errors]
  );

  const editForm = useCallback(() => {
    if (isBlocked) {
      setShowWarningSnackbar(true);
      return;
    }
    setEditMode(true);
  }, [isBlocked]);

  return (
    <>
      <StageTitle 
        title="Etapa 2: Seleccionar Tutor" 
        onEdit={editForm}
        disabled={isBlocked}
      />

      {isBlocked && (
        <Alert severity="warning" sx={{ mb: 2 }} icon={<WarningIcon />}>
          <AlertTitle>{"Fase de Tutor Registrada"}</AlertTitle>
          {"Esta fase ya ha sido completada y aprobada. No se puede editar el tutor porque \r"}
          {"la fase ya ha sido registrada. Si necesita hacer cambios, contacte al administrador.\r"}
        </Alert>
      )}

      <StageContainer>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <MentorSelection
              disabled={editMode}
              formik={formik}
              process={process}
              renderFieldError={renderFieldError}
            />
            <DateSelection disabled={editMode} formik={formik} renderFieldError={renderFieldError} />
          </Grid>
          <DocumentCheckbox disabled={editMode} formik={formik} carrer={carrer} process={process} />
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button type="button" onClick={onPrevious} variant="contained" color="secondary">
              Anterior
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isBlocked}>
              {canApproveStage ? "Aprobar Etapa" : "Guardar"}
            </Button>
          </Box>
        </form>
      </StageContainer>
      {showModal && (
        <ConfirmModal
          step={steps[1]}
          nextStep={steps[2]}
          isApproveButton={canApproveStage}
          setShowModal={setShowModal}
          onNext={handleModalAction}
        />
      )}
      <LoadingBackdrop loading={loading} canApproveStage={canApproveStage} />
      <Snackbar
        open={showWarningSnackbar}
        autoHideDuration={6000}
        onClose={handleWarningSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleWarningSnackbarClose} severity="warning" sx={{ width: "100%" }}>
          {"No se puede editar la Etapa 2 porque ya fue aprobada. "}
          {"La edición posterior solo puede realizarse a través de un administrador."}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MentorStage;
