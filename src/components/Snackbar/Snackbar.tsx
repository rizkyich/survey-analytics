import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { AlertType } from "../../interfaces/common.interfaces";

interface ISnackbarProps {
  open: boolean;
  message?: string;
  severity?: AlertType["severity"];
  closable?: boolean;
  detail?: string | React.ReactNode;
  onClose: () => void;
}

const SnackbarDiv = styled(Box)(({ theme, severity }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette[severity || 'info'].main,
  color: theme.palette[severity || 'info'].contrastText,
  padding: theme.spacing(1),
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.snackbar,
}));

const Snackbar = ({
  open,
  severity,
  message,
  closable,
  detail,
  onClose,
}: ISnackbarProps) => (
  <>
    {open && (
      <SnackbarDiv data-testid="snackbar-container" severity={severity}>
        <Box>
          {detail ? (
            <>
              <Typography color="inherit" variant="subtitle1">
                {message}
              </Typography>
              <Typography color="inherit" variant="caption">
                {detail}
              </Typography>
            </>
          ) : (
            <Typography color="inherit" variant="caption">
              {message}
            </Typography>
          )}
        </Box>
        {closable && (
          <Button color="inherit" size="small" onClick={onClose}>
            Tutup
          </Button>
        )}
      </SnackbarDiv>
    )}
  </>
);

export default Snackbar;
