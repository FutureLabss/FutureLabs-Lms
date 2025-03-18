import React, {HtmlHTMLAttributes,} from "react";

export interface TableHeaderActionProp<T> extends HtmlHTMLAttributes<HTMLElement> {
  item?: T;
  clickHandler?: (action: string, item: T) => void;
}

export interface TablePagination {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (page: number) => void;
}

export interface TableHeader<TData = unknown> {
  field: string;
  title: string;
  icon?: string;
  type?: string;
  sortable?: boolean;
  default?: string;
  action?: {
    component?: React.ElementType<TableHeaderActionProp<TData>>;
    props?: TableHeaderActionProp<TData>;
  };

  formatter?: (val: string) => string;
  component?: React.ElementType<TableHeaderActionProp<TData>>;
}

export interface ITablePagination {
  currentPage?: number;
  pageSize: number;
  totalCount?: number;
}
