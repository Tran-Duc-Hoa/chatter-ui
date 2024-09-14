import { useReactiveVar } from '@apollo/client';
import { Alert } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { SyntheticEvent } from 'react';
import { snackVar } from 'src/constants/snack';

export default function SimpleSnackbar() {
  const snack = useReactiveVar(snackVar);

  const handleClose = (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    snackVar(undefined);
  };

  return (
    <>
      {snack && (
        <Snackbar open={!!snack} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity={snack?.type}>{snack?.message}</Alert>
        </Snackbar>
      )}
    </>
  );
}
