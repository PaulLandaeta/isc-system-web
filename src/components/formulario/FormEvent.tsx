import React, { useState } from "react";
import dayjs from "dayjs";
import { EventFormState } from "../../models/formEventInterface.ts";

interface EventFormProps {
  onSubmit: (eventDetails: EventFormState) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel }) => {
  const [eventDetails, setEventDetails] = useState<EventFormState>({
    title: "",
    date: dayjs(),
    duration: 0,
    scholarshipHours: "",
    location: "",
    maxParticipants: 0,
    maxSubstitutes: 0,
    description: "",
    endDate: dayjs(),
    responsiblePerson: "",
  });

  dayjs.locale("es");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(eventDetails);
    setEventDetails({
      title: "",
      date: dayjs(),
      duration: 0,
      scholarshipHours: "",
      location: "",
      maxParticipants: 0,
      maxSubstitutes: 0,
      description: "",
      endDate: dayjs(),
      responsiblePerson: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label>
          Título del evento:
          <input
            type="text"
            name="title"
            placeholder="Título del evento"
            value={eventDetails.title}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            name="date"
            value={eventDetails.date.format("DD/MM/YYYY")}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </label>
        <label>
          Duración:
          <input
            type="text"
            name="duration"
            placeholder="Duración"
            value={eventDetails.duration}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </label>
        <label>
          Horas de beca:
          <input
            type="text"
            name="scholarshipHours"
            placeholder="Horas de beca"
            value={eventDetails.scholarshipHours}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </label>
        <label>
          Ubicación:
          <input
            type="text"
            name="location"
            placeholder="Ubicación"
            value={eventDetails.location}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </label>
        <label>
          Máximo de participantes:
          <input
            type="number"
            name="maxParticipants"
            placeholder="Máximo de participantes"
            value={eventDetails.maxParticipants}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </label>
        <label>
          Máximo de suplentes:
          <input
            type="number"
            name="maxSubstitutes"
            placeholder="Máximo de suplentes"
            value={eventDetails.maxSubstitutes}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={eventDetails.description}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ccc",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Agregar Evento
        </button>
      </div>
    </form>
  );
};

export default EventForm;
