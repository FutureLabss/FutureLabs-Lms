import { IclassRoomModules, IRetriveClassroomResponse, IsingleClassroomDetails, IsingleClassroomDetailsResponse } from "@/lib/types/classroom";
import { IQueryArgs } from "@/lib/types/query";
import { getAllClassRoom, getClasscroomModules, getSingleClassRoom } from "@/services/class-service";
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
    const getClassroom:IQueryArgs<IclassRoomModules>={
        key:["ClassroomModules"],
        callback:()=>getClasscroomModules(id)
    }
    return useGetResourcesQuery(getClassroom)
    }

    //   use query for getClassroomMaterials
export function  useGetAllClasscroomMaterials( id:string){
    const getClassroom:IQueryArgs<IclassRoomModules>={
        key:["ClassroomMaterials"],
        callback:()=>getClasscroomModules(id)
    }
    return useGetResourcesQuery(getClassroom)
    }