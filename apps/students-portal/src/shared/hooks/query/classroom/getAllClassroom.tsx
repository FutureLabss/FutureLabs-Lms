// import { IQueryArgs, IQueryOptions } from "@/core/types/interface/query";
import { IQueryArgs } from "@/core/types/interface/query";
import { useGetResourcesQuery } from "@/shared/hooks/helper/query";
import { getAllClassroom } from "@/core/services/classroom/getAllClassroom";
// import { GetAllClassroom } from "@/core/types/interface/classroom.ts/getAllClassroom";
import { GetAllClassroomResponse } from "@/core/types/interface/classroom.ts/getAllClassroom";

export function useGetAllClassrooms() {
  const Allusers: IQueryArgs<GetAllClassroomResponse> = {
    key: ["classrooms"],
    callback: () => getAllClassroom(),
  };
  return useGetResourcesQuery(Allusers);
}
