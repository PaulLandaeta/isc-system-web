import { FC } from "react";
import { Grid } from "@mui/material";
import ProfessorAutocomplete from "../selects/ProfessorAutoComplete";
import { FormikProps } from "formik";
import { Seminar } from "../../models/studentProcess";
import { MentorFormValues } from "../../hooks/useMentorFormik";

interface MentorSelectionProps {
  disabled: boolean;
  formik: FormikProps<MentorFormValues>;
  process: Seminar | null;
  renderFieldError: (fieldName: string) => JSX.Element | null;
}

const MentorSelection: FC<MentorSelectionProps> = ({
  disabled,
  formik,
  process,
  renderFieldError,
}) => {
  return (
    <Grid item xs={6} mt={5}>
      <ProfessorAutocomplete
        disabled={disabled}
        value={String(formik.values.mentor)}
        onChange={(_, value) => {
          formik.setFieldValue("mentor", value?.id || "");
          formik.setFieldValue("mentorName", value?.name || "");
          if (process) {
            process.tutor_fullname = value?.fullname || "";
          }
        }}
        id="mentor"
        label="Seleccionar Tutor"
      />
      {renderFieldError("mentor")}
    </Grid>
  );
};

export default MentorSelection;
