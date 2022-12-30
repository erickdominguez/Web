import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { api } from '../../helpers/api';
import LoginForm from '../atoms/LoginForm';
import TextField from '@mui/material/TextField';
import RegisterForm from '../atoms/RegisterForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  //state for the forms of login or forms
  const [login, setLogin] = useState(true);
  //states for login data
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  //states for register data
  const [registerFormData, setRegisterFormData] = useState({
    name: 'Mariel Venezuela',
    email: 'mariel@gmail.com',
    password: '123',
    age: '27',
    birth: '03/04/1094',
    country: 'MEXICO',
    gender: 'FEMALE',
    role: 'CONSUMER',
    status: 'PENDING',
  });
  //handle changes for the forms
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  //functions for handling the switch between register and login forms
  const handleRegisterForm = () => setLogin(false);
  const handleLoginForm = () => setLogin(true);
  //api calls
  const handleLoginData = () => {
    api.post('users/login', loginFormData);
  };

  const handleRegisterData = () => {
    api.post('users/register', registerFormData);
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Log in or register
          </Typography>
          {login ? (
            <LoginForm
              handleLoginChange={handleLoginChange}
              handleLoginData={handleLoginData}
              handleRegisterForm={handleRegisterForm}
            ></LoginForm>
          ) : (
            <RegisterForm
              handleLoginForm={handleLoginForm}
              handleRegisterData={handleRegisterData}
            ></RegisterForm>
          )}
        </Box>
      </Modal>
    </div>
  );
}
