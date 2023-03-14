import SnackbarContent from '@mui/material/SnackbarContent';
import React from 'react';
import { closeSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { api } from '../../helpers/api';
const LinearProgressSnack = React.forwardRef((props, ref) => {
  const { id, message, ...other } = props;
  const action = (
    <Button
      size='small'
      onClick={() => {
        closeSnackbar(id);
      }}
    >
      Cancel
    </Button>
  );

  return (
    <div {...props} ref={ref}>
      <SnackbarContent message={message} action={action}></SnackbarContent>
      <LinearProgress sx={{ marginTop: '-3px' }} />
    </div>
  );
});
export default LinearProgressSnack;
