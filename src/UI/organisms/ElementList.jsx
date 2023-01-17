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

export default function SongList() {
  useEffect(() => {
    songs();
  }, []);

  const { userToken } = useSelector((state) => state.auth);
  let { id } = useParams();
  const [element, setElement] = useState({});
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const config = {
    params: {
      id: id,
    },
    headers: {
      token: userToken,
    },
  };

  const songs = async () => {
    await api
      .get(`album`, config)
      .then((response) => {
        setElement(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  return (
    <Box>
      <Grid container spacing={3} p={3}>
        <Grid item xs={12}>
          <Box>
            <Typography variant='h2'>{element.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <List>
            {loading
              ? null
              : element.songs.map((song) => (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={song.title} secondary='Artist' />
                      <ListItemText secondary={element.name} />
                      <ListItemText secondary='2:09' />
                      <FavoriteIcon
                        sx={song.like ? { color: theme.palette.primary.dark } : null}
                      ></FavoriteIcon>
                    </ListItemButton>
                  </ListItem>
                ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
