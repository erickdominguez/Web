import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label='Users' />
        <Tab label='Artists' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserLoginForm
          handleClose={props.handleClose}
          loginError={props.loginError}
          handleRegisterForm={props.handleRegisterForm}
        ></UserLoginForm>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ArtistLoginForm
          handleClose={props.handleClose}
          loginError={props.loginError}
          handleRegisterForm={props.handleRegisterForm}
        ></ArtistLoginForm>
      </TabPanel>
      <Button onClick={props.handleRegisterForm}>Don't have an account? Register now</Button>
    </Box>
  );
}
