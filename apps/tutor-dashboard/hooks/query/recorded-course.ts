import { GetRecordedCourse } from "@/lib/types/recorded-courses";
import { useGetResourcesQuery } from "../helper/query";
import { getRecordedCourses } from "@/services/recordedCourse-service";
import { IQueryArgs } from "@/lib/types/query";


export function useGetAllRecordedCourses() {
  const AllRecordedCourses: IQueryArgs<GetRecordedCourse[]> = {
    key: ["courses"],
    callback: () => getRecordedCourses(),
  };
  return useGetResourcesQuery(AllRecordedCourses);
}