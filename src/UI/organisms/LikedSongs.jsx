import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ImageIcon from '@mui/icons-material/Image';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { api } from '../../helpers/api';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';

export default function LikedSongs() {
  const { userInfo } = useSelector((state) => state.auth);
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={3} p={3}>
        <Grid item xs={12}>
          <Box>
            <Typography variant='h2'>Liked Songs</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <List>
            {userInfo.likes.map((song) => (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={song.title} secondary='Artist' />
                  <ListItemText secondary='Album' />
                  <ListItemText secondary='2:09' />
                  <FavoriteIcon sx={{ color: theme.palette.primary.dark }}></FavoriteIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
