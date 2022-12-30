import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { api } from '../../helpers/api';
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
  const [login, setLogin] = useState(true);
  const handleRegister = () => setLogin(false);
  const handleLogin = () => setLogin(true);

  const loginForm = (
    <Box>
      <TextField id='outlined-basic' label='Email' variant='outlined' />
      <TextField id='outlined-basic' label='Password' variant='outlined' />
      <Button
        onClick={console.log(api.post('login', { email: 'auth@gmail.com', password: '123' }))}
      >
        Prueba
      </Button>
      <Button onClick={handleRegister}>Don't have an account? Register now</Button>
    </Box>
  );
  const registerForm = (
    <Box>
      <TextField id='outlined-basic' label='Email' variant='outlined' />
      <TextField id='outlined-basic' label='Password' variant='outlined' />
      <Button onClick={handleLogin}>Already have an account? Log in now</Button>
    </Box>
  );

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
          {login ? loginForm : registerForm}
        </Box>
      </Modal>
    </div>
  );
}
