import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { api } from '../../../helpers/api';
import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { setSong } from '../../../features/player/playerSlice';
import { useDispatch } from 'react-redux';

export default function LikedSongs() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    const likedSongs = await api.get('song/liked', { warn: false });
    setSongs(likedSongs.data);
    setLoading(false);
  };

  const unlike = async (songId) => {
    try {
      await api.delete(`users/dislike?songId=${songId}`);
      fetchLikes();
    } catch (err) {}
  };

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
            {loading ? (
              <Grid>
                <CircularProgress />
              </Grid>
            ) : (
              songs.map((song, index) => {
                const { artist } = song;
                const { album } = song;
                const songId = song?._id;
                const title = song?.title;
                const id = song?.album?._id;
                console.log(song.album);
                return (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        dispatch(setSong({ songId, title, artist, id }));
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={`${process.env.REACT_APP_API_URL}/media?id=${song?.album?._id}`}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={song.title} secondary={artist} />
                      <ListItemText secondary={album.name} />
                      <ListItemText secondary={song.duration} />
                    </ListItemButton>
                    <FavoriteIcon
                      sx={{ color: theme.palette.primary.dark }}
                      onClick={() => unlike(song._id)}
                    ></FavoriteIcon>
                  </ListItem>
                );
              })
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
