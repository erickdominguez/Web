import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddBoxIcon from '@mui/icons-material/AddBox';
const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

const actions = [
  {
    icon: (
      <Link to='/newAlbum' style={linkStyle}>
        <AddBoxIcon />
      </Link>
    ),
    name: 'Create Album',
  },
  {
    icon: (
      <Link to='/uploadSong' style={linkStyle}>
        <FileUploadIcon />
      </Link>
    ),
    name: 'Upload Song',
  },
];

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SpeedDial
      ariaLabel='SpeedDial controlled open example'
      sx={{ position: 'fixed', bottom: 170, right: 24 }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  );
}
