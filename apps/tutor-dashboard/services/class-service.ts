// import type { ClassroomResponse } from "@/lib/types";
import { handleError } from "@/components/ui/exception/catchErrors";
import { apiClient } from "@/lib/api-client";
import { ClassroomScheduleResponse, IclassRoomMaterials, IclassRoomModules, IRetriveClassroomResponse, IsingleClassroomDetails, IsingleClassroomDetailsResponse, Itopic } from "@/lib/types/classroom";

// Get all classes
export async function getAllClassRoom():Promise<IRetriveClassroomResponse>{
  const Promise = apiClient.get<IRetriveClassroomResponse>("classrooms")
  .then((response)=>{
    return response;
  })
  return Promise
};

// Get a class by ID
export async function getSingleClassRoom(classroomId:string):Promise<IsingleClassroomDetails>{
  const Promise = apiClient.get<IsingleClassroomDetails>(`classrooms/${classroomId}`)
  .then((response)=>{
    return response;
  })
  return Promise
};

// Create a new class
export async function createClasscroom(formData: ClassroomScheduleResponse): Promise<ClassroomScheduleResponse> {
  return apiClient.post<ClassroomScheduleResponse>("classrooms/", formData,)
  .then((response)=>{
    return response
  }).catch(handleError);
    }
    
    
    // Update a class
    
    // Delete a class
    export async function deleteClasscroom(classroomId:string): Promise<ClassroomScheduleResponse> {
      return apiClient.delete<ClassroomScheduleResponse>(`classrooms/${classroomId}`)
      .then((response)=>{
        return response
      }).catch(handleError);
        }


// create a classmodulus
export async function createClasscroomModules(data: IclassRoomModules, classroomId: string): Promise<IclassRoomModules> {
  return apiClient.post<IclassRoomModules>(`classrooms/${classroomId}/modules`, data)
    .then((response) => {
      return response;
    }).catch(handleError);
}


// get a classmodulus
export async function getClasscroomModules(classroomId: string): Promise<IclassRoomModules> {
  return apiClient.get<IclassRoomModules>(`classrooms/${classroomId}/modules`)
    .then((response) => {
      return response;
    }).catch(handleError);
}


// create a classmaterials
export async function createClasscroomMaterials(data: IclassRoomMaterials, topicId: string): Promise<IclassRoomMaterials> {
  return apiClient.post<IclassRoomMaterials>(`topics/${topicId}/material`, data)
    .then((response) => {
      return response;
    }).catch(handleError);
}


// get a classmaterials
export async function getClasscroomMaterials(classroomId: string): Promise<IclassRoomMaterials> {
  return apiClient.post<IclassRoomMaterials>(`classrooms/${classroomId}/materials`)
    .then((response) => {
      return response;
    }).catch(handleError);
}

// create a classmaterialsTopic
export async function createClasscroomModulesTopic(data: Itopic, moduleId: string): Promise<Itopic> {
  return apiClient.post<Itopic>(`modules/${moduleId}/topics`, data)
    .then((response) => {
      return response;
    }).catch(handleError);
}