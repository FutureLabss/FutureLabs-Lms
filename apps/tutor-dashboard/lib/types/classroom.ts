interface ClassroomDetails {
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  course: string;
  status: "active" | "inactive";
}

interface ScheduleDetails {
  days_of_week: string[];
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  status: "active" | "inactive";
}

export interface ClassroomScheduleResponse {
  classroom: ClassroomDetails;
  schedule: ScheduleDetails;
}

interface IgetClassroom {
  id: number;
  name: string;
  course: string;
  students_count: number;
  started_in_months: number;
  materials_count: number;
  status: "active" | "inactive";
  created_by: string;
}

export interface IRetriveClassroomResponse {
  success: boolean;
  message: string;
  data: IgetClassroom[];
}

//   get single interface
interface Schedule {
  id: number;
  days_of_week: string[];
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  status: "active" | "inactive"; // Update as needed
  classroom_id: number;
  created_at: string;
  updated_at: string;
}
interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrollmentDate: string;
}

export interface IsingleClassroomDetails {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  image_public_id: string | null;
  section: string | null;
  status: "active" | "inactive";
  start_date: string;
  end_date: string;
  created_by: number | string;
  updated_by: number | null;
  course_id: number;
  created_at: string;
  updated_at: string;
  students_count: number;
  modules_count: number;
  tutors: any[];
  students: Student[];
  schedules: Schedule;
}
export interface IsingleClassroomDetailsResponse {
  success: boolean;
  message: string;
  data: IsingleClassroomDetails;
}
export interface LocalClassData {
  id: string | number;
  name: string;
  description: string;
  section: string | null;
  currentStudents: number;
  startDate: string;
  endDate: string;
  schedule: {
    daysOfWeek: string[];
    startTime: string;
    endTime: string;
  };
  status: "active" | "inactive" | "completed";
  tutorId: string | number;
  students: Student[];
  materials: IclassRoomMaterials[];
  assignments: any[];
  modules: IclassRoomModules[];
}

//   classroommodules
export interface IclassRoomModules {
  title: string;
  description: string;
  id?: string | null;
  Itopic?: Itopic[];
}
// materials
export interface IclassRoomMaterials {
  title: string;
  type: string;
  url: string;
  size: string;
  created_at?: string;
}
// topic
export interface Itopic {
  title: string;
  description: string;
  duration: number;
  id?: string;
}
