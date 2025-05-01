import { ClassroomResponse, IclassRoomMaterials, IclassRoomModules, IRetriveClassroomResponse, IsingleClassroomDetails, IsingleClassroomDetailsResponse, TopicResponse } from "@/lib/types/classroom";
import { IQueryArgs } from "@/lib/types/query";
import { createClasscroomMaterials, getAllClassRoom, getClasscroomModules, getClasscroomModulesTopic, getSingleClassRoom } from "@/services/class-service";
import { useGetResourcesQuery } from "../helper/query";

//   use query for getClassroom
export function  useGetAllClassroom(){
const getClassroom:IQueryArgs<IRetriveClassroomResponse>={
    key:["classroom"],
    callback:()=>getAllClassRoom()
}
return useGetResourcesQuery(getClassroom)
}

//   use query for singleClassroom
export function  useGetSingleClassroom(classroomId:string){
const getClassroom:IQueryArgs<IsingleClassroomDetails>={
    key:["Singleclassroom"],
    callback:()=>getSingleClassRoom(classroomId)
}
return useGetResourcesQuery(getClassroom)
}
//   use query for getClassroomModules
export function  useGetAllClasscroomModules( id:string){
    const getClassroom:IQueryArgs<ClassroomResponse>={
        key:["ClassroomModules"],
        callback:()=>getClasscroomModules(id)
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
    export function  useGetAllClasscroomModulesTopic( modulesId:string, classroomId:string){
        const getClassroomModulesTopic:IQueryArgs<TopicResponse>={
            key:["ClassroomModulesTopics"],
            callback:()=>getClasscroomModulesTopic(modulesId, classroomId)
        }
        return useGetResourcesQuery(getClassroomModulesTopic)
        }