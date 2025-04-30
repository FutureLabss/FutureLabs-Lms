// import { IQueryArgs, IQueryOptions } from "@/core/types/interface/query";
import { IQueryArgs, IAPIFilter } from "@/core/types/interface/query";
import { useGetResourcesQuery } from "@/shared/hooks/helper/query";
// import { getAllClassroom } from "@/core/services/classroom/getAllClassroom";
import { getSingleClassroom } from "@/core/services/classroom/getSingleClassroom";
// import { GetAllClassroom } from "@/core/types/interface/classroom.ts/getAllClassroom";
// import { GetAllClassroomResponse } from "@/core/types/interface/classroom.ts/getAllClassroom";
import { SingleClassroomResponse } from "@/core/types/interface/classroom.ts/getSingleClassroom";

export function useGetSingleClassroom(id: string) {
  const singleClassroom: IQueryArgs<SingleClassroomResponse> = {
    key: ["singleclassroom", id as unknown as IAPIFilter],
    callback: () => getSingleClassroom(id),
  };
  return useGetResourcesQuery(singleClassroom);
}
