import * as React from 'react';
import Box from '@mui/material/Box';
import LoginTabs from '../molecules/auth/LoginTabs';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import RegisterTabs from '../molecules/auth/RegisterTabs';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  //state for the forms of login or forms
  const [login, setLogin] = useState(true);
  //state of errors
  const [loginError, setLoginError] = useState();
  const [registerError, setRegisterError] = useState();

  //functions for handling the switch between register and login forms
  const handleRegisterForm = () => setLogin(false);
  const handleLoginForm = () => setLogin(true);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {login ? (
            <LoginTabs
              handleClose={props.handleClose}
              loginError={loginError}
              handleRegisterForm={handleRegisterForm}
            ></LoginTabs>
          ) : (
            <RegisterTabs
              handleClose={props.handleClose}
              handleLoginForm={handleLoginForm}
              registerError={registerError}
            ></RegisterTabs>
          )}
        </Box>
      </Modal>
    </div>
  );
}
