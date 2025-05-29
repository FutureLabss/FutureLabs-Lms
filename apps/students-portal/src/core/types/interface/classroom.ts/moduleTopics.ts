// 🔁 Shared content base (used by Module, Topic, etc.)
export interface BaseContent {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes or seconds
  created_by: string;
  updated_by: string;
  status: number | string; // could be an enum in the future
}

export interface Pagination {
  links: PaginationLinks;
  meta: PaginationMeta;
}
// ✅ Course Material structure
export interface CourseMaterial {
  id: number;
  title: string;
  type: string; // e.g., 'PDF', 'DOCX'
  url: string;
  created_by: string;
  updated_by: string;
  status: string;
}

// ✅ CourseModule extends BaseContent and adds materials
export interface CourseModule extends BaseContent {
  materials: CourseMaterial[];
}

// ✅ Topic is same as BaseContent; use directly to avoid empty extension
// If you prefer a semantic alias:
export type Topic = BaseContent;

// ✅ API response for single module or topic
export interface SingleModuleTopicResponse {
  message: string;
  data: CourseModule;
}

// ✅ Paginated list of topics (or base content)
export interface TopicsListResponse {
  message: string;
  data: Topic[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

// ✅ Paginated list of materials
export interface MaterialsListResponse extends Pagination {
  message: string;
  data: CourseMaterial[];
}

// ✅ Reusable pagination link structure
export interface PaginationLinks {
  first: string;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  to: number;
}

export interface MaterialResponse extends BaseContent {
  module: string;
  topic: string;
  url: string;
  type: string;
}


export interface SingleMaterialItem {
  id: number;
  module: string; // e.g., "Functional Components in React"
  title: string;  // e.g., "video html"
  topic: string;  // e.g., "React function"
  type: string;   // e.g., "link"
  url: string;    // e.g., "https://summerofcode.withgoogle.com/program"
  status: string; // e.g., "N/A"
  created_by: string; // e.g., "Raymond Uko"
  updated_by: string; // e.g., "N/A"
}



export interface ClassroomAllMaterialResponse {
  message: string;
  data: MaterialResponse[];
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  due_date: string;
  points: number;
  topic: string;
  module: string;
  classroom: string;
  created_by: string;
  updated_by: string;
  created_date: string;
  submission: Submission;
}

export interface ClassroomAllAssignmentResponse extends Pagination {
  message: string;
  data: Assignment[];
}

export interface SingleAssignmentResponse {
  message: string;
  data: Assignment;
}

export interface AssignmentSubmission {
  id: number;
  submission_text: string;
  file_path: string | null;
  public_id: string | null;
  student_id: number;
  assignment_id: number;
  submitted_at: string; // ISO date string
  is_late: boolean;
  updated_at: string; // ISO date string
  created_at: string; // ISO date string
  submission: Submission
};
export interface Submission {
  id: number;
  student: string; // name of the student
  assignment_id: number;
  submitted_at: string; // e.g., "2025-05-23 15:45:19"
  score: number;
  status: 'submitted' | 'not_submitted'; // extend if needed
  grade_status: 'pending' | 'graded';   // extend if needed
}

export interface AssignmentSubmissionDTO {
  message: string;
  data: AssignmentSubmission;
}

