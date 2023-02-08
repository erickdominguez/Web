import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loginUser } from '../../../features/auth/authActions';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function LoginForm(props) {
  const gridItemStyle = { width: '100%' };
  const { loading, userInfo, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h5'>To continue please sign in</Typography>
      <Grid component='form' onKeyUp={formPreventDefault} container spacing={2} marginY={2}>
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
      {success ? props.handleClose() : null}
      {error ? (
        <Alert severity='error' mb={2}>
          Invalid credentials
        </Alert>
      ) : null}
      {loading ? (
        <CircularProgress />
      ) : (
        <Button onClick={() => submitForm(loginFormData)} variant='contained'>
          Log In
        </Button>
      )}
      <Button onClick={props.handleRegisterForm}>Don't have an account? Register now</Button>
    </Box>
  );
}
