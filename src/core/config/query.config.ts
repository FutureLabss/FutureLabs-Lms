import { QueryClient } from "react-query";

export default function getQueryClientConfig() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          cacheTime: 10 * 60 * 1000, 
          retry: 1,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    })
}
