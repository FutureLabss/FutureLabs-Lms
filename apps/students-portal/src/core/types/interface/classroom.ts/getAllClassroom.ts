export interface GetAllClassroom {
  id: string;
  name: string;
  course: string;
  students_count: number;
  started_in_months: number;
  materials_count: number;
  status: string;
  created_by: string;
}

export interface GetAllClassroomResponse {
  message: string;
  data: GetAllClassroom[];
}
