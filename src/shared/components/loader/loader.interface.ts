import { IPlaceholderContent } from "@/core/types/generic/placeholder";

export interface LoadingConfig extends IPlaceholderContent {
  displayLoader?: boolean;
}

export interface ErrorConfig extends IPlaceholderContent {
  displayError?: boolean;
}

export interface SuccessConfig extends IPlaceholderContent {
  displaySuccess?: boolean;
}
