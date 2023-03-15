import SnackbarContent from '@mui/material/SnackbarContent';
import React from 'react';
import { useEffect, useState } from 'react';
import { closeSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { api } from '../../helpers/api';
const LinearProgressSnack = React.forwardRef((props, ref) => {
  const { id, message, data, userToken, album, ...other } = props;
  const [messageState, setMessageState] = useState(message);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .post(`song?id=${album}`, data, {
        headers: { token: userToken, 'Content-Type': '*/*' },
      })
      .then((response) => {
        setMessageState('Uploaded');
        return response;
      })
      .catch(function (error) {
        return error.response?.status;
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          closeSnackbar(id);
        }, 5000);
      });
  }, []);

  const action = (
    <Button
      size='small'
      onClick={() => {
        console.log(data);
        closeSnackbar(id);
      }}
      color='error'
    >
      Cancel
    </Button>
  );

  return (
    <div {...props} ref={ref}>
      <SnackbarContent message={messageState} action={action}></SnackbarContent>
      {loading ? <LinearProgress sx={{ marginTop: '-3px' }} /> : null}
    </div>
  );
});
export default LinearProgressSnack;
