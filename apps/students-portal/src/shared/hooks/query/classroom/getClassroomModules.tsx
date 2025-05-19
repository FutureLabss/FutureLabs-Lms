// import { IQueryArgs, IQueryOptions } from "@/core/types/interface/query";
import { IQueryArgs, IAPIFilter } from "@/core/types/interface/query";
import { useGetResourcesQuery } from "@/shared/hooks/helper/query";
import { getClassroomModules } from "@/core/services/classroom/getClassroomModule";
import { ClassModulesApiResponse } from "@/core/types/interface/classroom.ts/getClassroomModule";

export function useGetClassroomModules(id: string | undefined, page: number) {
  const singleClassroom: IQueryArgs<ClassModulesApiResponse> = {
    key: ["classroommodule", id as unknown as IAPIFilter, page],
    callback: () => getClassroomModules(id!, page),
  };
  return useGetResourcesQuery(singleClassroom, {
    enabled: !!id,
    keepPreviousData: true,
  });
}
