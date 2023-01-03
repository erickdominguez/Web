import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

export default function LoginForm(props) {
  const gridItemStyle = { width: '100%' };
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h5'>To continue please sign in</Typography>
      <Grid container spacing={2} marginY={2}>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            name='email'
            onChange={props.handleLoginChange}
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
            onChange={props.handleLoginChange}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
      </Grid>
      {props.loginError ? (
        <Typography color={theme.palette.error.main} mb={2}>
          Wrong credentials{' '}
        </Typography>
      ) : null}
      <Button onClick={props.handleLoginData} variant='contained'>
        Log In
      </Button>
      <Button onClick={props.handleRegisterForm}>Don't have an account? Register now</Button>
    </Box>
  );
}
