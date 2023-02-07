import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SidebarPlaylists from '../molecules/SidebarPlaylists';
import SidebarUser from '../molecules/SidebarUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AlbumIcon from '@mui/icons-material/Album';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';

export default function Sidebar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerWidth = 240;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();
  const { success } = useSelector((state) => state.auth);
  const linkStyle = {
    textDecoration: 'none',
    color: 'aliceblue',
  };

  const activeStyle = {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
  };
  const drawer = (
    <div>
      <List>
        <NavLink to='/' style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
        </NavLink>

        {success ? (
          <NavLink to={`/liked`} style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary={'Liked Songs'} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ) : null}
        {success ? (
          <NavLink to='/albums' style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AlbumIcon />
                </ListItemIcon>
                <ListItemText primary={'Albums'} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ) : null}
      </List>
      <Divider />
      {success ? <SidebarPlaylists /> : <SidebarUser />}
    </div>
  );

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 0 }}
      aria-label='mailbox folders'
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

function ResponsiveDrawer(props) {}
