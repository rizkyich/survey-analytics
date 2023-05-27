import { useContext } from "react";

import SnackbarContext from "./SnackbarContext";

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error(
      "useSnackbar must be used within a SnackbarProvider component"
    );
  }

  return context;
};

export default useSnackbar;
