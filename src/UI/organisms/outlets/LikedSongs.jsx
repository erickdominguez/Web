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
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { setSong } from '../../../features/player/playerSlice';
import { useDispatch } from 'react-redux';

export default function LikedSongs() {
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [albumInfo, setAlbumInfo] = useState([]);
  const [likedSongs, setLikedSongs] = useState({});
  const theme = useTheme();

  useEffect(() => {
    likes();
  }, []);

  const config = {
    headers: {
      token: userToken,
    },
  };

  const likes = async () => {
    await api
      .get(`users?id=${userInfo?._id}`, config)
      .then((response) => {
        Promise.all(
          response?.data?.likes.map((song) => {
            return album(song.album);
          }),
        ).then((response) => {
          setAlbumInfo(response);
        });
        setLikedSongs(response?.data?.likes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  const album = async (id) => {
    const config = {
      params: {
        id: id,
      },
      headers: {
        token: userToken,
      },
    };

    return await api
      .get(`album`, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  const unlike = async (songId) => {
    const config = {
      data: {
        id: userInfo._id,
        song: songId,
      },
      headers: {
        token: userToken,
      },
    };

    await api
      .delete('users/dislike', config)

      .catch((error) => {
        console.log(error.toJSON());
      });
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
              likedSongs.map((song, index) => {
                let artist = albumInfo[index]?.data?.author?.name;
                let album = albumInfo[index]?.data?.name;
                let songId = song?._id;
                let title = song?.title;
                let id = song?.album;
                return (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        dispatch(setSong({ songId, title, artist, id }));
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={`http://localhost:4000/api/media?id=${song.album}`} />
                      </ListItemAvatar>
                      <ListItemText primary={song.title} secondary={artist} />
                      <ListItemText secondary={album} />
                      <ListItemText secondary='2:09' />
                    </ListItemButton>
                    <FavoriteIcon
                      sx={{ color: theme.palette.primary.dark }}
                      onMouseEnter={() => console.log('siii')}
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
