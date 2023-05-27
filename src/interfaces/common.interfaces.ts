export type AlertType = {
  severity:
    | typeof SEVERITY_ERROR
    | typeof SEVERITY_SUCCESS
    | typeof SEVERITY_INFO
    | typeof SEVERITY_WARNING;
  message: string;
};
