import { FC, ReactNode, useMemo, useState } from "react";

import { Toast, ToastContainer } from "react-bootstrap";

import {
  ToastContext,
  ToastMessage,
} from "../../context/ToastContext/ToastContext";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toastContent, setToastContent] = useState<ToastMessage | null>();

  const open = (toast: ToastMessage) => {
    setToastContent(toast);
  };

  const contextValue = useMemo(
    () => ({
      openToast: open,
    }),
    [],
  );

  const handleClose = () => {
    setToastContent(null);
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toastContent && (
        <ToastContainer position="top-end" className="p-3">
          <Toast
            bg={toastContent.variant}
            onClose={handleClose}
            show={true}
            delay={4000}
            autohide
          >
            <Toast.Body>{toastContent.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </ToastContext.Provider>
  );
};
