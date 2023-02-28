import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { loginUser } from '../../../features/auth/authActions';
import CircularProgress from '@mui/material/CircularProgress';
import { setShow, setType, setMessage } from '../../../features/alert/alertSlice';
import { setError } from '../../../features/auth/authSlice';

export default function LoginForm(props) {
  const gridItemStyle = { width: '100%' };
  const { loading, error, success, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(setShow(true));
      dispatch(setMessage('Invalid credentials'));
      dispatch(setType('error'));
    }
    setTimeout(() => {
      dispatch(setError(null));
    }, 1000);
  }, [error]);

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const formPreventDefault = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      submitForm(loginFormData);
    }
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const submitForm = (data) => {
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    dispatch(loginUser(data));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component='form' onKeyUp={formPreventDefault} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            name='email'
            onChange={handleLoginChange}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            name='password'
            onChange={handleLoginChange}
            sx={gridItemStyle}
            size='small'
            type='password'
          />
        </Grid>
      </Grid>
      {userToken ? props.handleClose() : null}

      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          onClick={() => submitForm(loginFormData)}
          variant='contained'
          sx={{ marginTop: '18px' }}
        >
          Log In
        </Button>
      )}
    </Box>
  );
}
