import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerAtom from '../../atoms/DatePickerAtom';
import { registerUser } from '../../../features/auth/authActions';
import { useState, useEffect, useRef } from 'react';
import { setShow, setType, setMessage } from '../../../features/alert/alertSlice';
import { setError, setSuccess } from '../../../features/auth/authSlice';
import ReCAPTCHA from 'react-google-recaptcha';
import { api } from '../../../helpers/api';

export default function RegisterForm(props) {
  const { loading, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const captchaRef = useRef(null);

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
      dispatch(setMessage('An error ocurred, fill all required fields'));
      dispatch(setType('error'));
    }
    setTimeout(() => {
      dispatch(setError(null));
    }, 1000);
  }, [error]);

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

  const verifyToken = async (token) => {
    let response = await api.post('captcha', { token }, { warn: false });
    return response.data;
  };
  const submitForm = async (data) => {
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    if (data.password !== confirmPassword) {
      dispatch(setShow(true));
      dispatch(setMessage("Passwords don't match"));
      dispatch(setType('warning'));
    } else {
      let token = captchaRef.current.getValue();
      if (token) {
        let valid_token = await verifyToken(token);
        if (valid_token.success) {
          dispatch(registerUser(data));
        } else {
          dispatch(setShow(true));
          dispatch(setMessage('Invalid captcha'));
          dispatch(setType('error'));
        }
      } else {
        dispatch(setShow(true));
        dispatch(setMessage('Confirm captcha'));
        dispatch(setType('error'));
      }
    }
  };

  const gridItemStyle = { width: '100%' };
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component='form' onKeyUp={formPreventDefault} container spacing={2} marginBottom={2}>
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
        <Grid item xs={12}>
          <DatePickerAtom
            label='Birth date'
            name='birth'
            setFormData={setRegisterFormData}
          ></DatePickerAtom>
        </Grid>
        <Grid item xs={12}>
          <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
        </Grid>
      </Grid>
      <Button onClick={() => submitForm(registerFormData)} variant='contained'>
        Register
      </Button>
    </Box>
  );
}
