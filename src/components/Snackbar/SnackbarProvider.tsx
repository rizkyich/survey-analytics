import { useEffect, useState } from "react";

import Snackbar from "./Snackbar";
import SnackbarContext from "./SnackbarContext";

import { AlertType } from "../../interfaces/common.interfaces";

type SnackbarStateType = {
  open: boolean;
  severity?: AlertType["severity"],
  message?: string;
  closable?: boolean;
  detail?: string | React.ReactNode;
};

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackbar, setSnackbar] = useState<SnackbarStateType>({
    message: undefined,
    open: false,
    severity: undefined,
    closable: false,
    detail: undefined,
  });

  const {
    message,
    severity,
    open,
    detail,
    closable,
  } = snackbar;

  const show = (
    title: string,
    level?: AlertType["severity"],
    isClosable?: boolean,
    text?: string | React.ReactNode
  ) => {
    setSnackbar({
      open: true,
      message: title,
      severity: level,
      closable: isClosable,
      detail: text,
    });
  };

  const handleClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  const context = { show };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      <SnackbarContext.Provider value={context}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        open={open}
        severity={severity}
        message={message}
        detail={detail}
        closable={closable}
        onClose={handleClose}
      />
    </>
  );
};

export default SnackbarProvider;
