import { createContext } from "react";

export interface ToastMessage {
  message: string;
  variant: "success" | "danger" | "info" | "warning";
}

export interface ToastContextProps {
  openToast: (toast: ToastMessage) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined,
);
