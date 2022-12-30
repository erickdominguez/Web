import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function LoginForm(props) {
  return (
    <Box>
      <TextField
        id='outlined-basic'
        label='Email'
        variant='outlined'
        name='email'
        onChange={props.handleLoginChange}
      />
      <TextField
        id='outlined-basic'
        label='Password'
        variant='outlined'
        name='password'
        onChange={props.handleLoginChange}
      />
      <Button onClick={props.handleLoginData}>Prueba</Button>
      <Button onClick={props.handleRegisterForm}>Don't have an account? Register now</Button>
    </Box>
  );
}
