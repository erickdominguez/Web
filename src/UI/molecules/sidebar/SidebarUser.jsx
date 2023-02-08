import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AuthModal from '../../organisms/AuthModal';

export default function SidebarUser(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <AuthModal open={open} handleClose={handleClose} />
      <Button onClick={handleOpen} variant='outlined' sx={{}}>
        Log In
      </Button>
    </Box>
  );
}
