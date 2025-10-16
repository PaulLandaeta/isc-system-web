export interface InitGraduationProcess {
  studentCode: string;
  modeId: string;
  period: string;
  titleProject: string;
  stageId: number;
}

export interface InitGraduationProcessDB {
  student_code?: string;
  modality_id: string;
  period: string;
  project_name: string;
  stage_id: number;
}
