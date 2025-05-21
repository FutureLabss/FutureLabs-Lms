export interface Tutor {
  id: number;
  fullname: string;
  email: string;
}

export interface Student {
  id: number;
  fullname: string;
  email: string;
}

export interface Schedule {
  id: number;
  days_of_week: string[];
  start_date: string; // ISO date string, e.g., "2025-04-22"
  end_date: string; // ISO date string, e.g., "2025-04-23"
  start_time: string; // e.g., "16:38:00"
  end_time: string; // e.g., "18:38:00"
  status: string;
  classroom_id: number;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface SingleClassroomResponse {
  message: string;
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  image_public_id: string | null;
  section: string | null;
  status: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  created_by: number;
  updated_by: number | null;
  course_id: number;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  students_count: number;
  modules_count: number;
  tutors: Tutor[];
  students: Student[];
  schedules: Schedule;
}
