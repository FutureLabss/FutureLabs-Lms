import { IPlaceholderContent } from "@/lib/types/generic/placeholder";
import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  loadingContent?: IPlaceholderContent;
  // setLoading: (loading: boolean, content?: IPlaceholderContent) => void;
}

const useLoadingStore = create<LoadingState>((set) => (
  {
  isLoading: false,
  loadingContent: { title: "", text: "" },
  // setLoading: (loading: boolean, loadingContent?: IPlaceholderContent) => set({ isLoading: loading, loadingContent }),
}
));

export default useLoadingStore;
