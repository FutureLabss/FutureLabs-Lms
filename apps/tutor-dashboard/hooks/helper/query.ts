import { useQuery } from "react-query";
import { useManageErrorNotifications, useManageLoadingState } from "./misc";
import { IPaginatedQueryArgs, IQueryArgs, IQueryOptions } from "@/lib/types/query";

export function useGetResourcesQuery<IReturn>({ callback, key }: IQueryArgs<IReturn>, options: IQueryOptions = {}) {
  const { loadingConfig = { displayLoader: true }, errorConfig = { displayError: false }, ...queryOptions } = options;

  const { status, data, isLoading, isFetching, error, refetch } = useQuery(
    key,
    (arg) => callback && callback(arg),
    queryOptions
  );
  useManageLoadingState(isLoading, loadingConfig);
  useManageErrorNotifications(error as Error, errorConfig);
  return { data, status, loading: isLoading, error, isFetching, refetch };
}

export function usePaginationQuery<IReturn>({ callback, key }: IPaginatedQueryArgs<IReturn>) {
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    key,
   (arg) => callback && callback(arg),
    { keepPreviousData: true }  // Important for smooth pagination
  );

  // Calculate pagination metadata
  const current_page = data?.meta?.current_page || 1;
  const per_page = data?.meta?.per_page || 10;
  const totalItems = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / per_page);
  const hasNextPage = !!data?.links?.next;
  const hasPrevPage = !!data?.links?.prev;

  return {
    data,
    loading: isLoading,
    isFetching,
    error,
    current_page,
    totalPages,
    per_page,
    hasNextPage,
    hasPrevPage,
    nextPageUrl: data?.links?.next,
    prevPageUrl: data?.links?.prev,
  };
}

// export function usePaginationQuery<IReturn>({ callback, key }: IPaginatedQueryArgs<IReturn>, options?: IQueryOptions) {
//   const { status, data, isLoading, isFetching, error, refetch } = useQuery(
//     key,
//     (arg) => callback && callback(arg),
//     options
//   );

//   let total = 0;
//   let current_page = 1;
//   let totalItems = 0;
//   let per_page = 10;

//  if (data?.meta) {
//     const { current_page: cp, per_page: pp, to } = data.meta;
//     current_page = cp;
//     per_page = pp;
//   totalItems = to; // This might be inaccurate if `meta.total` is missing
//   total = Math.ceil(to / per_page);
// }


//   return {
//     data: data?.data,
//     status,
//     loading: isLoading,
//     error,
//     isFetching,
//     refetch,
//     total,
//     totalItems,
//     current_page,
//     per_page,
//   };
// }
