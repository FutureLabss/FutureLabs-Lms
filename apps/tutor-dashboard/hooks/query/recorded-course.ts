import { Course, CreateRecordedCourseResponse, GetRecordedCourseData, GetSingleRecordedCourseResponse, RecordedCourseData } from "@/lib/types/recorded-courses";
import { useGetResourcesQuery } from "../helper/query";
import { getRecordedCourseById, getRecordedCourses } from "@/services/recordedCourse-service";
import { IQueryArgs } from "@/lib/types/query";


export function useGetAllRecordedCourses() {
  const AllRecordedCourses: IQueryArgs<GetRecordedCourseData> = {
    key: ["courses"],
    callback: () => getRecordedCourses(),
  };
  return useGetResourcesQuery(AllRecordedCourses);
}

export function useGetSingleRecordedCourse(id: number) {
  const singleRecordedCourse: IQueryArgs<GetSingleRecordedCourseResponse> = {
    key: ["recordedCourse", { id }],
    callback: () => getRecordedCourseById(id),
    suspense: true,
  };
  return useGetResourcesQuery(singleRecordedCourse);
}