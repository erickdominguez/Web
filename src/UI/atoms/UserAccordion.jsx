import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';

export default function SimpleAccordion() {
  const { userInfo } = useSelector((state) => state.auth);
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
    <Accordion sx={{ width: '200px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='user info' id='user-info'>
        <Avatar
          sx={{
            backgroundColor: stringToColor('User Name'),
            width: 24,
            height: 24,
            marginX: '5px',
          }}
        >
          <Typography>{stringAvatar('User Name')}</Typography>
        </Avatar>
        <Typography noWrap sx={{ textOverflow: 'ellipsis', width: '130px' }}>
          User Name
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
