import { useFormik } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { Seminar } from "../models/studentProcess";

export interface MentorFormValues {
  mentor: number | undefined | string;
  mentorName: string;
  tutorDesignationLetterSubmitted: boolean;
  tutorApprovalLetterSubmitted: boolean;
  date_tutor_assignament: Dayjs | null;
}

const useMentorFormik = (process: Seminar | null, onSubmit: () => void) => {
  const validationSchema = Yup.object({
    mentor: Yup.string().required("Debe seleccionar un tutor"),
    mentorName: Yup.string().required("Debe seleccionar un tutor"),
    tutorDesignationLetterSubmitted: Yup.boolean(),
    tutorApprovalLetterSubmitted: Yup.boolean(),
    date_tutor_assignament: Yup.mixed()
      .nullable()
      .required("Debe seleccionar una fecha")
      .test("is-valid", "Fecha no válida", (value) => {
        if (value === null || value === undefined || value === "") {
          return false;
        }
        if (dayjs.isDayjs && dayjs.isDayjs(value as unknown as Dayjs)) {
          return (value as Dayjs).isValid();
        }
        const parsed = dayjs(value as unknown as string | number | Date | Dayjs | null);
        return parsed.isValid();
      }),
  });

  const formik = useFormik<MentorFormValues>({
    initialValues: {
      tutorDesignationLetterSubmitted: process?.tutor_letter || false,
      tutorApprovalLetterSubmitted: process?.tutor_approval || false,
      date_tutor_assignament: process?.date_tutor_assignament
        ? dayjs(process.date_tutor_assignament)
        : null,
      mentor: process?.tutor_id || "",
      mentorName: process?.tutor_name || "",
    },
    validationSchema,
    onSubmit,
  });

  const canApproveStage = useMemo(
    () =>
      Boolean(
        formik.values.mentor &&
          formik.values.tutorDesignationLetterSubmitted &&
          formik.values.date_tutor_assignament &&
          formik.values.tutorApprovalLetterSubmitted
      ),
    [
      formik.values.mentor,
      formik.values.tutorDesignationLetterSubmitted,
      formik.values.date_tutor_assignament,
      formik.values.tutorApprovalLetterSubmitted,
    ]
  );

  return { formik, canApproveStage };
};

export default useMentorFormik;
