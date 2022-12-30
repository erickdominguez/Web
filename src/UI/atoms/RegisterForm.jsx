import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function RegisterForm(props) {
  // {
  //     "name": "Mariel Venezuela",
  //     "email": "mariel@gmail.com",
  //     "password": "123",
  //     "age": "27",
  //     "birth": "03/04/1094",
  //     "country": "MEXICO",
  //     "gender": "FEMALE",
  //     "role": "CONSUMER",
  //     "status": "PENDING"
  // }
  return (
    <Box>
      <TextField id='outlined-basic' label='Name' variant='outlined' />
      <TextField id='outlined-basic' label='Email' variant='outlined' />
      <TextField id='outlined-basic' label='Password' variant='outlined' />
      <TextField id='outlined-basic' label='Confirm password' variant='outlined' />
      <Button onClick={props.handleLoginForm}>Already have an account? Log in now</Button>
      <Button onClick={props.handleRegisterData}>Prueba</Button>
    </Box>
  );
}
