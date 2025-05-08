export interface SingleModuleTopicResponse {
  message: string;
  data: CourseModule;
}


export interface CourseModule {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes or seconds depending on your backend
  created_by: string;
  updated_by: string;
  status: number | string; // Adjust depending on your enum or usage
  materials: CourseMaterial[];
}


export interface CourseMaterial {
  id: number;
  title: string;
  type: string; // e.g., 'PDF', 'DOCX', etc.
  url: string;
  created_by: string;
  updated_by: string;
  status: string;
}
