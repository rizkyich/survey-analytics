import { createContext } from "react";

import { AlertType } from "../../interfaces/common.interfaces";

export type SnackbarContextType = {
  show: (
    message: string,
    severity?: AlertType["severity"],
    closable?: boolean,
    detail?: string | React.ReactNode
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  show: () => ({}),
});

export default SnackbarContext;
