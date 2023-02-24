import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerAtom from '../../atoms/DatePickerAtom';
import { registerUser } from '../../../features/auth/authActions';
import { useState } from 'react';

export default function RegisterForm(props) {
  const { loading, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //states for register data
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    birth: '',
    role: 'CONSUMER',
    status: 'PENDING',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const formPreventDefault = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      submitForm(registerFormData);
    }
  };

  const submitForm = (data) => {
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    if (data.password !== confirmPassword) {
      console.log(data);
    } else {
      dispatch(registerUser(data));
    }
  };

  const gridItemStyle = { width: '100%' };
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component='form' onKeyUp={formPreventDefault} container spacing={2} marginBottom={2}>
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
            type='password'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='outlined-basic'
            label='Confirm password'
            variant='outlined'
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            sx={gridItemStyle}
            size='small'
            type='password'
          />
        </Grid>
        <Grid item xs={12}>
          <DatePickerAtom name='birth' setFormData={setRegisterFormData}></DatePickerAtom>
        </Grid>
      </Grid>
      {props.registerError ? (
        <Typography color={theme.palette.error.main} mb={2}>
          There is already an account with that email
        </Typography>
      ) : null}
      <Button onClick={() => submitForm(registerFormData)} variant='contained'>
        Register
      </Button>
    </Box>
  );
}
