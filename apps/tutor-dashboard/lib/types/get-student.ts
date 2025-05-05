export interface AddStudent {
  id: number;
  fullname: string;
  email: string;
  joined: string;
}

export interface GetStudentsResponse {
  message: string;
  data: AddStudent[];
}

export interface AddStudentResponse {
  message: string;
  not_added: string[];
}
