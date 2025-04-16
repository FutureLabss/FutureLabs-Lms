// import type { ClassroomResponse } from "@/lib/types";

import { handleError } from "@/components/ui/exception/catchErrors";
import { ClassroomScheduleResponse } from "@/lib/types/classroom";
import axios, { AxiosResponse } from "axios";

// Get all classes
export const getClasses = async () => {
  try {
    // In a real app, you would make an API call here
    // const response = await apiClient.get('/classes');
    // return response.data;

    // For now, we'll use the mock data from lib/data.ts
    const { classes } = await import("@/lib/data");
    return classes;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

// Get a class by ID
export const getClassById = async (classId: string) => {
  try {
    // In a real app, you would make an API call here
    // const response = await apiClient.get(`/classes/${classId}`);
    // return response.data;

    // For now, we'll use the mock data from lib/data.ts
    const { classes } = await import("@/lib/data");
    return classes.find((c) => c.id === classId);
  } catch (error) {
    console.error("Error fetching class:", error);
    throw error;
  }
};

// Create a new class
export async function createClasscroom(formData: ClassroomScheduleResponse): Promise<ClassroomScheduleResponse> {
  return axios.post<ClassroomScheduleResponse>("classrooms/", formData,)
  .then((response: AxiosResponse<ClassroomScheduleResponse>)=>{
    return response.data
  }).catch(handleError);
    }
  
// Update a class
export const updateClass = async (
  classId: string,
  classData: Partial<ClassroomScheduleResponse>
) => {
  try {
    // In a real app, you would make an API call here
    // const response = await apiClient.put(`/classes/${classId}`, classData);
    // return response.data;

    // For now, we'll simulate a successful update
    return {
      success: true,
      data: {
        id: classId,
        ...classData,
      },
    };
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};

// Delete a class
export const deleteClass = async (classId: string) => {
  try {
    // In a real app, you would make an API call here
    // const response = await apiClient.delete(`/classes/${classId}`);
    // return response.data;

    // For now, we'll simulate a successful deletion
    return { success: true };
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};
