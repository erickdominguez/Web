import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../UI/organisms/Sidebar';
import MusicPlayer from '../../UI/organisms/MusicPlayer/index';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Root() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  useEffect(() => {
    if (isObjectEmpty(userInfo)) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar></Sidebar>
        <Box>
          <Outlet></Outlet>
        </Box>
      </Box>
      {/*Views or Playlists?*/}
      <MusicPlayer></MusicPlayer>
    </Box>
  );
}
