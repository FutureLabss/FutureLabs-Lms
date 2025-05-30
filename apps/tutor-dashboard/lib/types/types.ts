// Shared types for the application

// User types
export interface Role {
  id: number;
  name: string;
}
export interface User {
  fullname: string;
  roles: Role[];
  profile_id: number;
  email?: string;
  id?: string;
  role?: "tutor" | "student" | "admin"
  avatar?: string;
  bio?: string;
  title?: string;
  phone?: string;
  image?: string;
}

// Course types (extending from Class)
export interface Course {
  id: string;
  title: string;
  description?: string;
  category: string;
  thumbnail?: string;
  status: "draft" | "published";
  tutorId: string;
  students: string[]; // Array of student IDs
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  description?: string;
  order: number;
  duration: number;
  type: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;
  duration: number; // in seconds
  thumbnail?: string;
}

// Shared types
export interface Material {
  id: string;
  title: string;
  description?: string;
  type: "pdf" | "document" | "presentation" | "link" | "other";
  url: string;
  createdAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  points: number;
  submissions: Submission[];
}

export interface Submission {
  id: string;
  studentId: string;
  submittedAt: string;
  status: "submitted" | "graded" | "late" | "missing";
  grade?: number;
  feedback?: string;
  attachments: string[]; // Array of file URLs
}

// Progress tracking
export interface Progress {
  userId: string;
  courseId?: string;
  classId?: string;
  moduleId?: string;
  videoId?: string;
  completed: boolean;
  progress: number; // Percentage from 0-100
  lastAccessed: string;
}
