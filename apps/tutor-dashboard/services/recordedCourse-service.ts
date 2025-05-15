import { MaterialTypeData, ModuleSchemaType, ModuleTypeData, VideoTypeData } from "@/app/(dashboard)/courses/[id]/page";
import { toast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api-client"
import { AddMaterialResponse, AddVideoResponse, Course, CreateRecordedCourseRequest, CreateRecordedCourseResponse, GetRecordedCourseData, GetSingleRecordedCourseResponse, Material, ModuleResponseDTO, RecordedCourseData } from "@/lib/types/recorded-courses";
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


export const getRecordedCourses = async (): Promise<GetRecordedCourseData> => {
  try {
    const response = await apiClient.get<GetRecordedCourseData>('/recorded-courses');
    return response;
  } catch (error) {
    console.error("Error fetching recorded courses:", error);
    throw error;
  }
}


export const getRecordedCourseById = async (id: number): Promise<GetSingleRecordedCourseResponse> => {
  try {
    const response = await apiClient.get<GetSingleRecordedCourseResponse>(`/recorded-courses/${id}`);
    console.log("getRecordedCourseById", response);

    return response;
  } catch (error) {
    console.error("Error fetching recorded course:", error);
    throw error;
  }
}


export const DeleteRecordedCourse = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<{ message: string }>(`/recorded-courses/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting recorded course:", error);
    throw error;
  }
}

export const AddModule = async (data: ModuleTypeData): Promise<ModuleResponseDTO> => {
  try {
    const response = await apiClient.post<ModuleResponseDTO
    >(`/recorded-courses/${data.id}/modules`, data);
    toast({
      title: "Success",
      description: "Module added successfully",
      variant: "default",
    })

    return response;

  } catch (error) {
    console.error("Error adding module:", error);
    toast({
      title: "Error",
      description: "Error adding module",
      variant: "destructive",
    })
    throw error;
  }
}

export const DeleteModule = async (data: { id: number, moduleId: number }): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<{ message: string }>(`/recorded-courses/${data.id}/modules/${data.moduleId}`);
    toast({
      title: "Success",
      description: "Module deleted successfully",
      variant: "default",
    })
    return response;
  } catch (error) {
    console.error("Error deleting module:", error);
    toast({
      title: "Error",
      description: "Error deleting module",
      variant: "destructive",
    })
    throw error;
  }
}

export const AddVideo = async (data: VideoTypeData): Promise<AddVideoResponse> => {
  try {
    const response = await apiClient.post<AddVideoResponse>(`/recorded-modules/${data.moduleId}/videos`, data.data);
    toast({
      title: "Success",
      description: "Video added successfully",
      variant: "default",
    })
    return response;
  } catch (error) {
    console.error("Error adding video:", error);
    toast({
      title: "Error",
      description: "Error adding video",
      variant: "destructive",
    })
    throw error;
  }
}


export const AddMaterial = async (data: MaterialTypeData): Promise<AddMaterialResponse> => {
  try {
    const response = await apiClient.post<AddMaterialResponse>(`recorded-modules/${data.moduleId}/materials`, data.data);
    toast({
      title: "Success",
      description: "Material added successfully",
      variant: "default",
    })
    return response;
  } catch (error) {
    console.error("Error adding material:", error);
    toast({
      title: "Error",
      description: "Error adding material",
      variant: "destructive",
    })
    throw error;
  }
}

export const DeleteModuleVideo = async (data: { moduleId: number, videoId: number }): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<{ message: string }>(`/recorded-modules/${data.moduleId}/videos/${data.videoId}`);
    toast({
      title: "Success",
      description: "Video deleted successfully",
      variant: "default",
    })
    return response;
  } catch (error) {
    console.error("Error deleting video:", error);
    toast({
      title: "Error",
      description: "Error deleting video",
      variant: "destructive",
    })
    throw error;
  }
}

export const DeleteModuleMaterial = async (data: { moduleId: number, materialId: number }): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<{ message: string }>(`/recorded-modules/${data.moduleId}/materials/${data.materialId}`);
    toast({
      title: "Success",
      description: "Material deleted successfully",
      variant: "default",
    })
    return response;
  } catch (error) {
    console.error("Error deleting material:", error);
    toast({
      title: "Error",
      description: "Error deleting material",
      variant: "destructive",
    })
    throw error;
  }
}








// export const getRecordedCourseById = async (id: number): Promise<GetRecordedCourse> => {  


