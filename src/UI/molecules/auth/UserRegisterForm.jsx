import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import DatePickerAtom from '../../atoms/DatePickerAtom';
import MenuItem from '@mui/material/MenuItem';
import { api } from '../../../helpers/api';
import { useState } from 'react';

export default function RegisterForm(props) {
  // const submitForm = (data) => {
  //   // check if passwords match
  //   if (data.password !== data.confirmPassword) {
  //     alert('Password mismatch');
  //   }
  //   // transform email string to lowercase to avoid case sensitivity issues in login
  //   data.email = data.email.toLowerCase();
  //   dispatch(registerUser(data));
  // };
  //states for register data
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    birth: '',
    role: 'CONSUMER',
    status: 'PENDING',
  });
  //handle changes for the forms

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRegisterData = async () => {
    await api
      .post('auth/register', registerFormData)
      .then((response) => {
        if (response.status === 200) {
          props.setUser(response.data);
          props.handleClose();
        }
      })
      .catch((error) => {
        props.setRegisterError(true);
      });
  };
  const gridItemStyle = { width: '100%' };
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='Name'
            variant='outlined'
            name='name'
            onChange={handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            name='email'
            onChange={handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            name='password'
            onChange={handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='outlined-basic'
            label='Confirm password'
            variant='outlined'
            onChange={handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <DatePickerAtom name='birth' setRegisterFormData={setRegisterFormData}></DatePickerAtom>
        </Grid>
      </Grid>
      {props.registerError ? (
        <Typography color={theme.palette.error.main} mb={2}>
          There is already an account with that email
        </Typography>
      ) : null}
      <Button onClick={handleRegisterData} variant='contained'>
        Register
      </Button>
    </Box>
  );
}
