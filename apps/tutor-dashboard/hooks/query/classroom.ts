import { ClassroomResponse, IclassRoomMaterials, IclassRoomModules, IRetriveClassroomResponse, IsingleClassroomDetails, IsingleClassroomDetailsResponse, TopicResponse } from "@/lib/types/classroom";
import { IQueryArgs } from "@/lib/types/query";
import { createClasscroomMaterials, getAllClassRoom, getClasscroomModules, getClasscroomModulesTopic, getClasscroomSingleModules, getSingleClassRoom } from "@/services/class-service";
import { useGetResourcesQuery } from "../helper/query";

//   use query for getClassroom
// export function  useGetAllClassroom(){
// const getClassroom:IQueryArgs<IRetriveClassroomResponse>={
//     key:["ClassRoom"],
//     callback:()=>getAllClassRoom()
// }
// return useGetResourcesQuery(getClassroom)
// }


export function useGetAllClassroom() {
    const getClassroom: IQueryArgs<IRetriveClassroomResponse> = {
      key: ["classroom"],
      callback: () => getAllClassRoom(),
    };
    return useGetResourcesQuery(getClassroom);
  }
//   use query for singleClassroom
export function  useGetSingleClassroom(classroomId:string){
const getClassroom:IQueryArgs<IsingleClassroomDetails>={
    key:["SingleClassroom", {classroomId}],
    callback:()=>getSingleClassRoom(classroomId)
}
return useGetResourcesQuery(getClassroom)
}
//   use query for getClassroomModules
export function  useGetAllClasscroomModules( id:string){
    const getClassroom:IQueryArgs<ClassroomResponse>={
        key:["ClassroomModules", {id}],
        callback:()=>getClasscroomModules(id)
    }
    return useGetResourcesQuery(getClassroom)
    }
        // get single module
export function  useGetSingleClasscroomModules(classroomId: string, moduleId:string){
    const getClassroom:IQueryArgs<ClassroomResponse>={
        key:["ClassroomModules", {classroomId, moduleId}],
        callback:()=>getClasscroomSingleModules(classroomId, moduleId)
    }
    return useGetResourcesQuery(getClassroom)
    }

    //   use query for getClassroomMaterials
export function  useGetAllClasscroomMaterials( data:IclassRoomMaterials, classroomId:string, topicId:string){
    const getClassroom:IQueryArgs<IclassRoomMaterials>={
        key:["ClassroomMaterials"],
        callback:()=>createClasscroomMaterials(data, classroomId, topicId)
    }
    return useGetResourcesQuery(getClassroom)
    }

    // getClasscroomModulesTopic
    export function  useGetAllClasscroomModulesTopic( classroomId:string, modulesId:string){
        const getClassroomModulesTopic:IQueryArgs<TopicResponse>={
            key:["ClassroomModulesTopics", {classroomId, modulesId}],
            callback:()=>getClasscroomModulesTopic(classroomId, modulesId)
        }
        return useGetResourcesQuery(getClassroomModulesTopic)
        }
    
        