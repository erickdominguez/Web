import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { users } from '../../helpers/api';
export default function SidebarUser() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Button
        onClick={() => {
          users();
        }}
        variant='outlined'
        sx={{}}
      >
        Log In
      </Button>
    </Box>
  );
}
