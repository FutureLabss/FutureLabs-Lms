// Class types
// export interface Class {
//   id: string;
//   name: string;
//   description: string;
//   program: string;
//   maxStudents: number;
//   currentStudents: number;
//   startDate: string;
//   endDate: string;
//   schedule: {
//     daysOfWeek: string[];
//     startTime: string;
//     endTime: string;
//   };
//   status: "active" | "inactive" | "completed";
//   tutorId: string;
//   students: {
//     id: string;
//     name: string;
//     email: string;
//     avatar: string;
//     enrollmentDate: string;
//   }[];
//   materials: {
//     id: string;
//     title: string;
//     type: string;
//     url: string;
//     createdAt: string;
//   }[];
//   assignments: {
//     id: string;
//     title: string;
//     dueDate: string;
//     points: number;
//     submissions: any[];
//   }[];
//   modules: Module[];
// }
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
  