import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArtistRegisterForm from './ArtistRegisterForm';
import UserRegisterForm from './UserRegisterForm';
import { useTheme } from '@mui/material/styles';
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function CenteredTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Typography variant='h5'>To continue, please register</Typography>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label='Usuarios' />
        <Tab label='Artistas' />
      </Tabs>

      <TabPanel value={value} index={0}>
        <UserRegisterForm
          handleClose={props.handleClose}
          handleLoginForm={props.handleLoginForm}
          registerError={props.registerError}
        ></UserRegisterForm>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ArtistRegisterForm
          handleClose={props.handleClose}
          handleLoginForm={props.handleLoginForm}
          registerError={props.registerError}
        ></ArtistRegisterForm>
      </TabPanel>
      <Button onClick={props.handleLoginForm}>Already have an account? Log in now</Button>
    </Box>
  );
}
