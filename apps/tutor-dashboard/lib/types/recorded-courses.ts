
//Request DTO Body
export interface CreateRecordedCourseRequest {
  details: {
    title: string;
    branch?: string; // Optional
    description: string;
    course: string;
    course_visibility: "draft" | "published"; // assuming visibility is enum
  };
  module: ModuleRecordedRequest[];
}

export interface ModuleRecordedRequest {
  module_title: string;
  module_description?: string;
  video: VideoRequest[];
  material: MaterialRequest[];
}

export interface MaterialRequest {
  title: string;
  description?: string;
  type?: "PDF" | "DOC" | "LINK";
  url: string;
  public_id: string;

}

export interface VideoRequest {
  title: string;
  description?: string;
  url: string;
  public_id: string;
}




//Response DTO Body ==================== Sub-Types ====================

export interface CourseStatus {
  status: string;
  students_count: number | null;
  modules_count: number | null;
  vidoes_count: number | null;
  materials_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface StudentProgress {
  completion_rate: number;
  average_progress: number;
}

export interface MaterialResponse {
  id: number;
  title: string;
  description: string;
  type: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface VideoResponse {
  id: number;
  title: string;
  duration_in_seconds: number;
  url: string;
  description: string;
  views: number;
  average_watch_time: number;
  recorded_module_id: number;
  created_at: string;
  updated_at: string;
}


export interface ModuleRecordedResponse {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  videos: VideoResponse[];
  materials: MaterialResponse[];
}


// ==================== Main Response ====================

export interface RecordedCourseData {
  id: number;
  title: string;
  branch: string;
  description: string;
  views: string;
  completion: string;
  image_url: string;
  image_public_id: string;
  created_by: string;
  updated_by: string;
  course: string;
  course_status: CourseStatus;
  students_progress: StudentProgress;
  students: any[]; // can be more specific if you know the shape of a student
  modules: ModuleRecordedResponse[];
}

export interface CreateRecordedCourseResponse {
  message: string;
  data: RecordedCourseData;
}

export interface GetRecordedCourse {
  id: number;
  title: string;
  branch: string;
  description: string;
  views: number;
  completion: number;
  image_url: string;
  image_public_id: string;
  created_by: string;
  updated_by: string;
  course: string;
  course_status: CourseStatus;
  // students_progress: StudentsProgress;
  modules: ModuleRecordedRequest[];
}


//? ====================? Main Response ====================

// types/RecordedCourseDTO.ts

export interface Material {
  id: number;
  title: string;
  description: string | null;
  type: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface VideoData {
  id: number;
  title: string;
  duration_in_seconds: number;
  url: string;
  description: string | null;
  views: number;
  average_watch_time: number;
  recorded_module_id: number;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  videos: VideoData[];
  materials: Material[];
}

export interface CourseStatus {
  status: "draft" | "published" | string;
  students_count: number | null;
  modules_count: number | null;
  vidoes_count: number | null;
  materials_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface StudentsProgress {
  completion_rate: number;
  average_progress: number;
}

export interface Course {
  id: number;
  title: string;
  status: "draft" | "published" | string;
  branch: string;
  description: string;
  views: number;
  completion: number;
  image_url: string;
  image_public_id: string;
  created_by: string;
  updated_by: string;
  course: string;
  students_count: number | null;
  modules_count: number | null;
}
export interface DetailedCourse {
  id: number;
  title: string;
  branch: string;
  description: string;
  views: number;
  completion: number;
  image_url: string;
  image_public_id: string;
  created_by: string;
  updated_by: string;
  course: string;
  course_status: CourseStatus;
  students_progress: StudentsProgress;
  students: any[]; // Could be more specific if needed
  modules: Module[];
}
