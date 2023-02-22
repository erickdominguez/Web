import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

export default function SimpleAccordion() {
  const { userInfo } = useSelector((state) => state.auth);

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };

  function stringToColor(name) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  }

  return (
    <Accordion sx={{ width: '200px', position: 'absolute', right: '263px', top: '8px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='user info' id='user-info'>
        <Avatar
          sx={{
            backgroundColor: stringToColor(userInfo?.name),
            width: 24,
            height: 24,
            marginX: '5px',
          }}
          alt={userInfo?.name}
          src={`${process.env.REACT_APP_API_URL}/media?id=${userInfo?._id}`}
        ></Avatar>
        <Typography noWrap sx={{ textOverflow: 'ellipsis', width: '130px' }}>
          {userInfo?.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <Link to='/profile' style={linkStyle}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={'Profile'} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
