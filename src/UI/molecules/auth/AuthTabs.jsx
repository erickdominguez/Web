import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ArtistRegisterForm from './ArtistRegisterForm';
import UserRegisterForm from './UserRegisterForm';
import ArtistLoginForm from './ArtistLoginForm';
import UserLoginForm from '../auth/UserLoginForm';
import Button from '@mui/material/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CenteredTabs(props) {
  const [value, setValue] = useState(0);
  const [loginSwitch, setLoginSwitch] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSwitch = () => {
    setLoginSwitch(!loginSwitch);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label='Users' />
        <Tab label='Artists' />
      </Tabs>

      <TabPanel value={value} index={0}>
        {loginSwitch ? (
          <UserLoginForm handleClose={props.handleClose}></UserLoginForm>
        ) : (
          <UserRegisterForm
            handleClose={props.handleClose}
            handleSwitch={handleSwitch}
          ></UserRegisterForm>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loginSwitch ? (
          <ArtistLoginForm handleClose={props.handleClose}></ArtistLoginForm>
        ) : (
          <ArtistRegisterForm
            handleSwitch={handleSwitch}
            handleClose={props.handleClose}
          ></ArtistRegisterForm>
        )}
      </TabPanel>
      <Button onClick={handleSwitch}>Already have an account? Log in now</Button>
    </Box>
  );
}
