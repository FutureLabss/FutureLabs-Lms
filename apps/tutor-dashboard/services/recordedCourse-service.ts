import { apiClient } from "@/lib/api-client"
import { CreateRecordedCourseRequest, CreateRecordedCourseResponse, GetRecordedCourse } from "@/lib/types/recorded-courses";
export const createRecordedCourse = async (data: CreateRecordedCourseRequest): Promise<CreateRecordedCourseResponse> => {
  try {
    const response = await apiClient.post<CreateRecordedCourseResponse>('/recorded-courses', data);
    return {
      message: "Success",
      data: response.data
    } as CreateRecordedCourseResponse

  } catch (error) {
    console.error("Error creating recorded course:", error);
    throw error;
  }
}


export const getRecordedCourses = async (): Promise<GetRecordedCourse[]> => {
  try {
    const response = await apiClient.get<GetRecordedCourse[]>('/recorded-courses');
    return response;
  } catch (error) {
    console.error("Error fetching recorded courses:", error);
    throw error;
  }
}


// export const getRecordedCourseById = async (id: number): Promise<GetRecordedCourse> => {  