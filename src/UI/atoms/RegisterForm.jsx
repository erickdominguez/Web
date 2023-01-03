import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import DatePickerAtom from '../atoms/DatePickerAtom';
import MenuItem from '@mui/material/MenuItem';

export default function RegisterForm(props) {
  const gridItemStyle = { width: '100%' };
  const theme = useTheme();
  const gender = [
    {
      value: 'FEMALE',
      label: 'Female',
    },
    {
      value: 'MALE',
      label: 'Male',
    },
  ];
  const country = [
    {
      value: 'MEXICO',
      label: 'Mexico',
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h5'>To continue, please register</Typography>
      <Grid container spacing={2} marginY={2}>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='Name'
            variant='outlined'
            name='name'
            onChange={props.handleRegisterChange}
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
            onChange={props.handleRegisterChange}
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
            onChange={props.handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='outlined-basic'
            label='Confirm password'
            variant='outlined'
            onChange={props.handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <DatePickerAtom name='birth' onChange={props.handleRegisterChange}></DatePickerAtom>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            id='outlined-basic'
            label='Country'
            variant='outlined'
            name='country'
            onChange={props.handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          >
            {country.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            id='outlined-basic'
            label='Gender'
            variant='outlined'
            name='gender'
            onChange={props.handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          >
            {gender.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      {props.registerError ? (
        <Typography color={theme.palette.error.main} mb={2}>
          There is already an account with that email
        </Typography>
      ) : null}
      <Button onClick={props.handleRegisterData} variant='contained'>
        Register
      </Button>
      <Button onClick={props.handleLoginForm}>Already have an account? Log in now</Button>
    </Box>
  );
}
