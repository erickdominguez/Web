import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { api } from '../../../helpers/api';
import { useState, useEffect } from 'react';
import { registerArtist } from '../../../features/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { setShow, setType, setMessage } from '../../../features/alert/alertSlice';
import { setError, setSuccess } from '../../../features/auth/authSlice';
export default function RegisterForm(props) {
  const { loading, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    genre: '',
    role: 'CONSUMER',
    status: 'PENDING',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  //handle changes for the forms
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(setSuccess(false));
      }, 1000);
      dispatch(setShow(true));
      dispatch(setMessage('User Created'));
      dispatch(setType('success'));
      props.handleSwitch();
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      dispatch(setShow(true));
      dispatch(setMessage('An error ocurred, fill all requiered fields'));
      dispatch(setType('error'));
    }
    setTimeout(() => {
      dispatch(setError(null));
    }, 1000);
  }, [error]);

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitForm = (data) => {
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    if (data.password !== confirmPassword) {
      dispatch(setShow(true));
      dispatch(setMessage("Passwords don't match"));
      dispatch(setType('warning'));
    } else {
      dispatch(registerArtist(data));
    }
  };

  const gridItemStyle = { width: '100%' };
  const theme = useTheme();

  const country = [
    {
      value: 'MEXICO',
      label: 'Mexico',
    },
    { value: 'USA', label: 'USA' },
    { value: 'ALEMANIA', label: 'Alemania' },
  ];

  const genre = [
    {
      value: 'INDIE',
      label: 'Indie',
    },
    {
      value: 'POP',
      label: 'Pop',
    },
    {
      value: 'ROCK',
      label: 'Rock',
    },
    {
      value: 'SALSA',
      label: 'Salsa',
    },
    {
      value: 'TRAP',
      label: 'Trap',
    },
    {
      value: 'HIP_HOP',
      label: 'Hip Hop',
    },
    {
      value: 'JAZZ',
      label: 'Jazz',
    },
    {
      value: 'ALTERNATIVE',
      label: 'Alternative',
    },
    {
      value: 'HEAVY_METAL',
      label: 'Heavy Metal',
    },
    {
      value: "70's",
      label: '70s',
    },
    {
      value: "80's",
      label: '80s',
    },
    {
      value: 'EDM',
      label: 'EDM',
    },
    {
      value: 'COUNTRY',
      label: 'Country',
    },
    {
      value: 'ELECTRO',
      label: 'Electro',
    },
    {
      value: "60's",
      label: '60s',
    },
    {
      value: 'CUMBIA',
      label: 'Cumbia',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12}>
          <TextField
            required
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
            required
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
            required
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
            required
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
        <Grid item xs={6}>
          <TextField
            required
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
            required
            select
            id='outlined-basic'
            label='Genre'
            variant='outlined'
            name='genre'
            value={registerFormData.genre}
            onChange={handleRegisterChange}
            sx={gridItemStyle}
            size='small'
          >
            {genre.map((option) => (
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
      <Button onClick={() => submitForm(registerFormData)} variant='contained'>
        Register
      </Button>
    </Box>
  );
}
