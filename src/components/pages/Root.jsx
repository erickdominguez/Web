import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Sidebar from '../../UI/organisms/Sidebar';
import Toolbar from '@mui/material/Toolbar';
import Player from '../../UI/organisms/Player';
export default function Root() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar></Sidebar>
        <Box sx={{ overflow: 'scroll' }}>
          <Outlet></Outlet>
        </Box>
      </Box>
      {/*Views or Playlists?*/}
      <Player></Player>
    </Box>
  );
}
