import React, { FC } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../config/queryClient/queryClient";
import { AuthProvider } from "../providers/AuthProvider/AuthProvider";
import { ToastProvider } from "../providers/ToastProvider/ToastProvider";

interface ContextProps {
  children: React.ReactNode;
}

export const Context: FC<ContextProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </React.StrictMode>
  );
};
