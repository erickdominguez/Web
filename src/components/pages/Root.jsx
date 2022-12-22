import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Sidebar from "../../UI/organisms/Sidebar"
import Toolbar from '@mui/material/Toolbar';
export default function Root() {
  const drawerWidth = 240;
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar></Sidebar>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/*Views or Playlists?*/}
        <Link to='/view'>Hey</Link>
        <Link to='/v'>Hola</Link>
        <Outlet></Outlet>
      </Box>
    </Box>
    
  )
}
