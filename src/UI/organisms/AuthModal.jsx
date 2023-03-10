import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import AuthTabs from '../molecules/auth/AuthTabs';
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
  //functions for handling the switch between register and login forms

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <AuthTabs handleClose={props.handleClose}></AuthTabs>
        </Box>
      </Modal>
    </div>
  );
}
