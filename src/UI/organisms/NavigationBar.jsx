import React from 'react';
import Box from '@mui/material/Box';
import UserAccordion from '../atoms/UserAccordion';
export default function NavigationBar() {
  const style = {
    top: 9,
    width: '100%',
    display: 'inline-flex',
    position: 'fixed',
    borderBlockColor: 'palette.divider',
    zIndex: 1,
  };

  return (
    <Box
      component='nav'
      sx={{
        height: '50px',
        flexShrink: 0,
      }}
      aria-label='mailbox folders'
    >
      <Box sx={style} aria-label='navigation bar' component='nav'>
        <Box sx={{ flexDirection: 'row', display: 'contents' }}>
          <UserAccordion></UserAccordion>
        </Box>
      </Box>
    </Box>
  );
}
