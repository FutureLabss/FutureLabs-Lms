import { NotificationType } from "@/lib/types/enum/notification";
import { IMutationArgs } from "@/lib/types/query";
import useLoadingStore from "@/stores/loadingState";
import useNotificationStore from "@/stores/notificationState";
import { useMutation, useQueryClient } from "react-query";

export function useCreateResources<IArg, IReturn, TError>({
  callback,
  key,
  onSuccess,
  onSettled,
  onError,
  options: {
    retry,
    loadingConfig = { displayLoader: true },
    errorConfig = { displayError: true },
    successConfig = { displaySuccess: true },
  } = {},
}: IMutationArgs<IArg, IReturn, TError>) {
  const queryClient = useQueryClient();
  const setNotification = useNotificationStore((state) => state.setDisplay);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const { displayLoader = true, ...loadingContents } = loadingConfig;
  const { displayError = true, ...errorContents } = errorConfig;
  const { displaySuccess = true, ...successContent } = successConfig;

  const mutation = useMutation(callback, {
    onMutate: () => {
      if (displayLoader) setLoading(true, loadingContents);
    },

    onSuccess: (data: IReturn) => {
      key.forEach((part) => {
        queryClient.invalidateQueries([part]);
      });
      queryClient.invalidateQueries(key);
      // if (displaySuccess) {
      //   setNotification(true, {
      //     type: NotificationType.success,
      //     content: {
      //       title: su ?? "Success",
      //       text: successContent.text ?? "Your action was completed successfully",
      //     },
      //   });
      // }
      if (onSuccess) onSuccess(data);
    },

    onError: (err: TError) => {
      // if (displayError) {
      //   setNotification(true, {
      //     type: NotificationType.error,
      //     content: {
      //       title: errorContents.title ?? "Error",
      //       text: errorContents.text ?? (err as Error).message,
      //     },
      //   });
      // }
      if (onError) onError(err);
    },

    onSettled: () => {
      if (displayLoader) setLoading(false, loadingContents);
      if (onSettled) onSettled();
    },
    retry,
  });
  return mutation;
}
