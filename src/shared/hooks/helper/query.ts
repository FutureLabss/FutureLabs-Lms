import { useQuery } from "react-query";
import { useManageErrorNotifications, useManageLoadingState } from "./misc";
import { IPaginatedQueryArgs, IQueryArgs, IQueryOptions } from "@/core/types/interface/query";

export function useGetResourcesQuery<IReturn>({ callback, key }: IQueryArgs<IReturn>, options: IQueryOptions = {}) {
  const { loadingConfig = { displayLoader: true }, errorConfig = { displayError: false }, ...queryOptions } = options;

  const { status, data, isLoading, isFetching, error, } = useQuery(
    key,
    (arg) => callback && callback(arg),
    queryOptions
  );

  useManageLoadingState(isLoading, loadingConfig);
  useManageErrorNotifications(error as Error, errorConfig);
  return { data, status, loading: isLoading, error, isFetching };
}

export function usePaginationQuery<IReturn>({ callback, key }: IPaginatedQueryArgs<IReturn>, options?: IQueryOptions){
  const { status, data, isLoading, isFetching, error } = useQuery(
    key,
    (arg) => {
      return callback && callback(arg);
    },
    options
  );

  let totalPages = 0;
  let currentPage = 1;
  let totalItems = 0;
  let pageSize = 0;

  if (data?.pagination) {
    const { count, limit, page } = data.pagination;
    totalItems = count;
    currentPage = page;
    pageSize = limit;
    totalPages = Math.ceil(count / limit);
  }

  return {
    data: data?.data,
    status,
    loading: isLoading,
    error,
    isFetching,
    totalPages,
    totalItems,
    currentPage,
    pageSize,
  };
}
