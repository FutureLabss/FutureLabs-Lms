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

export function usePaginationQuery<IReturn>({ callback, key }: IPaginatedQueryArgs<IReturn>, options: IQueryOptions = {}) {
  const { loadingConfig = { displayLoader: true }, errorConfig = { displayError: false }, ...queryOptions } = options;
  const { status, data, isLoading, isFetching, error, refetch } = useQuery(
    key,
    (arg) => callback && callback(arg),
    queryOptions
  );

  let total = 0;
  let current_page = 1;
  let totalItems = 0;
  let per_page = 10;
  let hasNextPage = false;
  let hasPrevPage = false;

  if (data?.meta) {
    const { current_page: cp, per_page: pp, to, from } = data.meta;
    current_page = cp;
    per_page = pp;
    
    // If the API provides a total count directly, use it
    if (data.meta.total) {
      totalItems = data.meta.total;
    } else {
      // Otherwise use 'to' as an approximation
      totalItems = to;
    }
    
    // Calculate total pages
    total = Math.ceil(totalItems / per_page);
    
    // Check if there are next/previous pages based on links
    hasNextPage = !!data?.links?.next;
    hasPrevPage = !!data?.links?.prev;
  }

  return {
    data: data,
    status,
    loading: isLoading,
    error,
    isFetching,
    refetch,
    total,
    totalItems,
    current_page,
    per_page,
    hasNextPage,
    hasPrevPage,
    nextPageUrl: data?.links?.next || null,
    prevPageUrl: data?.links?.prev || null,
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
