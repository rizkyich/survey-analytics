import { createContext } from "react";

export type SnackbarContextType = {
  show: (
    message: string,
    closable?: boolean,
    detail?: string | React.ReactNode
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  show: () => ({}),
});

export default SnackbarContext;
