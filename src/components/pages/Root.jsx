import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Sidebar from "../../UI/organisms/Sidebar"
import Toolbar from '@mui/material/Toolbar';
import Player from "../../UI/organisms/Player"
export default function Root() {
  return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar></Sidebar>
        <Box
          component="main"
          
        >
          <Toolbar />
          <Outlet></Outlet>
          {/*Views or Playlists?*/}
          <Link to='/view'>Hey</Link>
          <Link to='/v'>Hola</Link>
          
        </Box>
        <Player></Player>
      </Box>    
  )
}
