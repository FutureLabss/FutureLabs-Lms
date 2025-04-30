// import { IQueryArgs, IQueryOptions } from "@/core/types/interface/query";
import { IQueryArgs, IAPIFilter } from "@/core/types/interface/query";
import { useGetResourcesQuery } from "@/shared/hooks/helper/query";
import { getClassroomModules } from "@/core/services/classroom/getClassroomModule";
import { ClassModulesApiResponse } from "@/core/types/interface/classroom.ts/getClassroomModule";

export function useGetClassroomModules(id: string) {
  const singleClassroom: IQueryArgs<ClassModulesApiResponse> = {
    key: ["classroommodule", id as unknown as IAPIFilter],
    callback: () => getClassroomModules(id),
  };
  return useGetResourcesQuery(singleClassroom);
}
