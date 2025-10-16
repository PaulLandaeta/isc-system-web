import { Dayjs } from 'dayjs';

export interface CreateDefenseDetail {
  graduation_process_id: number;
  type: 'internal' | 'external';
  president?: number;
  first_juror?: number;
  second_juror?: number;
  reviewer?: number;
  tutor?: number;
  grade?: number;
}

export interface DefenseDetail {
  id: number;
  graduation_process_id: number;
  type: 'internal' | 'external';
  president?: number;
  first_juror?: number;
  second_juror?: number;
  reviewer?: number;
  tutor?: number;
  grade?: number;
  date?: Dayjs;
}
