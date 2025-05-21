
import { LoadingConfig, ErrorConfig, SuccessConfig } from "@/components/loader/loader.interface";
import { PaginationMeta } from "./classroom";

export interface IAPIFilter {
  page?: number;
  pageSize?: number;
  [index: string]: string | number | undefined;
}

export interface IMutationArgs<IArg, IReturn, TError = Error> {
  key: (string | IAPIFilter)[];
  callback: (arg: IArg) => Promise<IReturn>;
  onSuccess?: (data?: IReturn) => void;
  onError?: (error: TError) => void;
  onSettled?: () => void;
  options?: IQueryOptions;
}

export interface IQueryArgs<IReturn> {
  key: [string, IAPIFilter?];
  callback: (arg?: unknown) => Promise<IReturn>;
  suspense?: boolean;
}

export interface IPaginatedQueryArgs<IReturn> {
  key: [string, IAPIFilter?];
  callback: (arg: unknown) => Promise<IPaginatedReturns<IReturn>>;
}

export interface IQueryOptions {
  enabled?: boolean;
  retry?: boolean;
  cacheTime?: number;
  staleTime?: number;
  loadingConfig?: LoadingConfig;
  errorConfig?: ErrorConfig;
  successConfig?: SuccessConfig;
}

export interface IPaginatedReturns<IReturn> {
  links: {first: string | null
  last: string | null
  prev: string | null
  next: string | null};
  meta: {
    total?: number; 
  current_page: number
  from: number
  path: string
  per_page: number
  to: number };
  data: IReturn;
}

export interface IMutationHook<IReturn = unknown, TError = Error> {
  onSuccess?: (data?: IReturn) => void;
  onError?: (error: TError) => void;
  onSettled?: () => void;
  options?: IQueryOptions;
}

