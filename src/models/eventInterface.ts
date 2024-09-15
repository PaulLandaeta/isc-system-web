import dayjs, { Dayjs } from "dayjs";

// TODO: refactor EventDetails ocurrences to use Event

export type EventStatus = "PENDIENTE" | "ACEPTADO" | "RECHAZADO";
export interface EventDetails {
  title: string;
  date: Dayjs;
  endDate: Dayjs;
  duration: number;
  scholarshipHours: string;
  location: string;
  maxParticipants: number;
  minParticipants: number;
  description: string;
  responsiblePerson: string;
  status: EventStatus;
}

export interface Event {
  id?: number;
  title: string;
  description?: string;
  assigned_hours: number;
  start_date: string;
  end_date: string;
  duration_hours: number;
  location: string;
  max_interns: number;
  min_interns: number;
  responsible_intern_id?: number;
  registration_deadline: string;
  start_cancellation_date?: string;
  end_cancellation_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EventInformations extends Event {
  accepted_interns: string;
  pending_interns: string;
}

export interface EventInternsType extends Event {
  type: string;
}


export interface EventScholar {
    id_event: number;
    name: string;
    description: string;
    validatedHours: string;
    startDate: dayjs.Dayjs;
    duration: number;
    place: string;
    maxInterns: number;
    minInterns: number;
    responsiblePerson: string;
    pendingInterns: number;
    selectedInterns: number;
    status: EventStatus
}