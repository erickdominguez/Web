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
import { registerArtist } from '../../../features/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';

export default function RegisterForm(props) {
  const { loading, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    birth: '',
    country: '',
    gender: '',
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

  const submitForm = (data) => {
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    if (data.password !== confirmPassword) {
      console.log(data);
    } else {
      dispatch(registerArtist(data));
    }
  };

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
        <Grid item xs={6}>
          <TextField
            select
            id='outlined-basic'
            label='Country'
            variant='outlined'
            name='country'
            value={registerFormData.country}
            onChange={handleRegisterChange}
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
            id='outlined-basic'
            label='Genre'
            variant='outlined'
            name='genre'
            onChange={handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          ></TextField>
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
