import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../UI/organisms/Sidebar';
import MusicPlayer from '../../UI/organisms/MusicPlayer/index';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from '../../UI/atoms/Alert';
import NavigationBar from '../../UI/organisms/NavigationBar';
import ArtistMenu from '../../UI/molecules/ArtistMenus';
export default function Root() {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <Alert></Alert>
      <Box sx={{ display: 'flex', width: '100vw', flexGrow: 1 }}>
        <Sidebar></Sidebar>
        <Box sx={{ display: 'flex', width: '100%', flexGrow: 1 }}>
          <NavigationBar></NavigationBar>
          <Outlet></Outlet>
        </Box>
      </Box>
      {/*Views or Playlists?*/}
      <MusicPlayer></MusicPlayer>
      {userToken && userInfo?.role === 'ASSOCIATE' ? <ArtistMenu></ArtistMenu> : null}
    </Box>
  );
}
