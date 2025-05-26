// import type { ClassroomResponse } from "@/lib/types";
import { handleError } from "@/components/ui/exception/catchErrors";
import { toast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api-client";
import { ClassroomResponse, ClassroomScheduleResponse, CreateAssignmentRequest, CreateAssignmentResponse, IclassRoomMaterials,
   IclassRoomModules, IRetriveClassroomResponse, IsingleClassroomDetails, 
Itopic, MaterialsResponse, TopicResponse } from "@/lib/types/classroom";
import { AddStudentResponse } from "@/lib/types/get-student";
import { IPaginatedQueryArgs, IPaginatedReturns } from "@/lib/types/query";

// Get all classes
export async function getAllClassRoom(): Promise<IRetriveClassroomResponse> {
  const Promise = apiClient
    .get<IRetriveClassroomResponse>("classrooms")
    .then((response) => {
      return response;
    });
  return Promise;
}

// Get a class by ID
export async function getSingleClassRoom(
  classroomId: string
): Promise<IsingleClassroomDetails> {
  const Promise = apiClient
    .get<IsingleClassroomDetails>(`classrooms/${classroomId}`)
    .then((response) => {
      return response;
    });
  return Promise;
}

// Create a new class
export async function createClasscroom(
  formData: ClassroomScheduleResponse
): Promise<ClassroomScheduleResponse> {
  return apiClient
    .post<ClassroomScheduleResponse>("classrooms/", formData)
    .then((response) => {
      return response;
    })
    .catch(handleError);
}

// Update a class

// Delete a class
export async function deleteClasscroom(
  classroomId: string
): Promise<string> {
  return apiClient
    .delete<string>(`classrooms/${classroomId}`)
    .then((response) => {
      return response;
    })
    .catch(handleError);
}
// delete a module
export async function deleteClasscroomModule(
  classroomId: string, moduleId:string
): Promise<string> {
  return apiClient
    .delete<string>(`classrooms/${classroomId}/modules/${moduleId}`)
    .then((response) => {
      return response;
    })
    .catch(handleError);
}

// create a classmodulus
export async function createClasscroomModules(
  data: IclassRoomModules,
  classroomId: string
): Promise<IclassRoomModules> {
  return apiClient
    .post<IclassRoomModules>(`classrooms/${classroomId}/modules`, data)
    .then((response) => {
      return response;
    })
    .catch(handleError);
}
// add assignement api
export async function createClasscroomAssignment(
  data: CreateAssignmentRequest,
  classroomId: string
): Promise<CreateAssignmentRequest> {
  return apiClient
    .post<CreateAssignmentRequest>(`classrooms/${classroomId}/assignments`, data)
    .then((response) => {
      return response;
    })
    .catch(handleError);
}
// get all module
export async function getClasscroomModules(classroomId: string,  page = 1, pageSize = 10): Promise<ClassroomResponse>{
  return apiClient.get<ClassroomResponse>(`classrooms/${classroomId}/modules`, 
    {
    params: {
      page,
      per_page: pageSize,
    },
  }
  )
    .then((response) => {
       console.log("API Response:", response);
      return response;
    })
    .catch(handleError);
}

// get a single module
export async function getClasscroomSingleModules(classroomId: string, moduleId:string): Promise<ClassroomResponse> {
  return apiClient.get<ClassroomResponse>(`classrooms/${classroomId}/modules/${moduleId}`)
    .then((response) => {
      return response;
    })
    .catch(handleError);
}

// create a classmaterials
export async function createClasscroomMaterials(data: IclassRoomMaterials, classroomId:string, topicId: string): Promise<IclassRoomMaterials> {
  return apiClient.post<IclassRoomMaterials>(`classrooms/${classroomId}/topics/${topicId}/materials`, data)
    .then((response) => {
      return response;
    })
    .catch(handleError);
}

// get a classmaterials
export async function getClasscroomMaterials(classroomId: string, topicId:string): Promise<MaterialsResponse> {
  return apiClient
    .get<MaterialsResponse>(`classrooms/${classroomId}/topics/${topicId}/materials`)
    .then((response) => {
      return response;
    })
    .catch(handleError);
}

// create a classmaterialsTopic
export async function createClasscroomModulesTopic(
  data: Itopic,
  classroomId: string | undefined | null,
  moduleId: string | undefined | null
): Promise<Itopic> {
  return (
    apiClient
      .post<Itopic>(
        `classrooms/${classroomId}/modules/${moduleId}}/topics`,
        data
      )
      // return apiClient.post<Itopic>(`modules/${moduleId}/topics`, data)
      .then((response) => {
        return response;
      })
      .catch(handleError)
  );
}
export async function getClasscroomModulesTopic(
  classroomId: string,
  moduleId: string,
): Promise<TopicResponse> {
  return apiClient
    .get<TopicResponse>(`classrooms/${classroomId}/modules/${moduleId}/topics`)
    .then((response) => {
      return response;
    })
    .catch(handleError);
}

// export async function createStudent(data: Itopic, moduleId: string): Promise<Itopic> {
//   return apiClient.post<Itopic>(`modules/${moduleId}/topics`, data)
//     .then((response) => {
//       return response;
//     }).catch(handleError);
// }
// export async function createClasscroomModulesTopic(
//   data: Itopic,
//   moduleId: string
// ): Promise<Itopic> {
//   return apiClient
//     .post<Itopic>(`modules/${moduleId}/topics`, data)
//     .then((response) => {
//       return response;
//     })
//     .catch(handleError);
// }

export async function addStudentToClass(
  classid: string,
  userid: number
): Promise<AddStudentResponse> {
  return apiClient.post<AddStudentResponse>(`/classrooms/${classid}/students`, {
    user_ids: [userid],
  });
}


export const getAllClassroomMaterials = async ({
  classroomId,
}: {
  classroomId: number;
}): Promise<MaterialsResponse> => {
  try {
    const response = await apiClient.get<MaterialsResponse>(
      `classrooms/${classroomId}/resources?query=materials`
    );
    return response;
  } catch (error) {
    toast({
      title: "Error",
      description: `An error occurred while fetching module materials. ${
        error instanceof Error ? error.message : ""
      }`,
      variant: "destructive",
    });
    console.error("Error fetching module materials:", error);
    throw error;
  }
};
// get classroomassignment
export const getAllClassroomAssignments = async ({
  classroomId,
}: {
  classroomId: number;
}): Promise<CreateAssignmentResponse> => {
  try {
    const response = await apiClient.get<CreateAssignmentResponse>(
      `classrooms/${classroomId}/assignments?query=all`
    );
    return response;
  } catch (error) {
    toast({
      title: "Error",
      description: `An error occurred while fetching classroom assignment. ${
        error instanceof Error ? error.message : ""
      }`,
      variant: "destructive",
    });
    console.error("Error fetching classroom assignments:", error);
    throw error;
  }
};