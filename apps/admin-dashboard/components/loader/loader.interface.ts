import { IPlaceholderContent } from "@/lib/types/generic/placeholder";

export interface LoadingConfig extends IPlaceholderContent {
  displayLoader?: boolean;
}

export interface ErrorConfig extends IPlaceholderContent {
  displayError?: boolean;
  title?: string;
  text?: string;
}

export interface SuccessConfig extends IPlaceholderContent {
  displaySuccess?: boolean;
}
