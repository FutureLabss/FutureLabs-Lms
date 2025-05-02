import {
  Course,
  CreateRecordedCourseResponse,
  GetRecordedCourseData,
  GetSingleRecordedCourseResponse,
  RecordedCourseData,
} from "@/lib/types/recorded-courses";
import { studentService } from "@/services/student-service";
import { GetStudentsResponse } from "@/lib/types/get-student";
import { useGetResourcesQuery } from "../helper/query";
import {
  getRecordedCourseById,
  getRecordedCourses,
} from "@/services/recordedCourse-service";
import { IQueryArgs } from "@/lib/types/query";

export function useGetAllStudentsClasses() {
  const AllStudentsClasses: IQueryArgs<GetStudentsResponse> = {
    key: ["getStudentClasses"],
    callback: () => studentService.getStudentClasses(),
  };
  return useGetResourcesQuery(AllStudentsClasses);
}
