import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const is401 = (error as AxiosError)?.response?.status === 401;
        return is401 && failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: (failureCount, error) => {
        const is401 = (error as AxiosError)?.response?.status === 401;
        return is401 && failureCount < 2;
      },
    },
  },
});
