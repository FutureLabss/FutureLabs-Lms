import { QueryClient } from "react-query";

export default function getQueryClientConfig() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 0,
        // retry: 1,
      },
    },
  });
}
