import { FC, useEffect, useState } from "react";
import { Mentor } from "../../models/mentorInterface";
import { getMentors } from "../../services/mentorsService";
import { Autocomplete, TextField } from "@mui/material";

interface ProfessorAutocompleteProps {
  value: string;
  onChange: (event: React.ChangeEvent<unknown>, value: Mentor | null) => void;
  disabled?: boolean;
  id: string;
  label: string;
}

const ProfessorAutocomplete: FC<ProfessorAutocompleteProps> = ({
  value,
  onChange,
  disabled,
  id,
  label,
}) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMentors();
        setMentors(response.data);
      } catch (error) {
        setError("Error getting mentors");
      }
    };

    fetchData();
  }, []);

  return (
    <Autocomplete
      disabled={disabled}
      id={id}
      options={mentors}
      getOptionLabel={(option) => option.fullname}
      value={mentors.find((mentor) => mentor.id === Number(value)) || null}
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} label={label} error={Boolean(error)} helperText={error} />
      )}
    />
  );
};

export default ProfessorAutocomplete;
