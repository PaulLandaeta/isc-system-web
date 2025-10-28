import { FC } from "react";
import { Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

interface StageTitleProps {
  title: string;
  onEdit?: () => void;
  disabled?: boolean;
}

const StageTitle: FC<StageTitleProps> = ({ title, onEdit, disabled = false }) => {
  return (
    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
      {title}
      {onEdit && (
        <ModeEditIcon
          role="button"
          tabIndex={0}
          aria-label={disabled ? "Edición deshabilitada" : "Editar etapa"}
          onClick={disabled ? undefined : onEdit}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              onEdit();
            }
          }}
          sx={{
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            marginLeft: 1,
          }}
        />
      )}
    </Typography>
  );
};

export default StageTitle;
