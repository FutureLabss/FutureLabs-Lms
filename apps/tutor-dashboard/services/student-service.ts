import { handleError } from "@/components/ui/exception/catchErrors";
import { apiClient } from "@/lib/api-client";
import {
  // AddStudentResponse,
  GetStudentsResponse,
} from "@/lib/types/get-student";

// Define types for student-related data
interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrollmentDate: string;
  classes: string[];
  level: string;
  status: string;
  lastActive: string;
  progress: number;
}

interface StudentFilters {
  search?: string;
  level?: string;
  status?: string;
}

class StudentService {
  async getStudents(filters?: StudentFilters): Promise<Student[]> {
    // In a real app, this would make an API call with query parameters
    // return apiClient.get('/students', { params: filters })

    // For demo purposes, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data is already defined in the students page
        // This would normally fetch from the API
        resolve([]);
      }, 500);
    });
  }

  async getStudentClasses(): Promise<GetStudentsResponse> {
    return apiClient
      .get<GetStudentsResponse>("/tutor/students")
      .then((response) => {
        return response;
      })
      .catch(handleError);
  }

  async getStudentById(id: string): Promise<Student> {
    // In a real app, this would make an API call
    // return apiClient.get(`/students/${id}`)

    // For demo purposes, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data would normally be fetched from the API
        resolve({} as Student);
      }, 500);
    });
  }

  async createStudent(studentData: Omit<Student, "id">): Promise<Student> {
    // In a real app, this would make an API call
    // return apiClient.post('/students', studentData)

    // For demo purposes, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          ...studentData,
        });
      }, 500);
    });
  }

  async updateStudent(
    id: string,
    studentData: Partial<Student>
  ): Promise<Student> {
    // In a real app, this would make an API call
    // return apiClient.put(`/students/${id}`, studentData)

    // For demo purposes, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          ...studentData,
        } as Student);
      }, 500);
    });
  }

  async deleteStudent(id: string): Promise<void> {
    // In a real app, this would make an API call
    // return apiClient.delete(`/students/${id}`)

    // For demo purposes, we'll just resolve after a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}

export const studentService = new StudentService();
