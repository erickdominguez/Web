import React from 'react';
import PlaylistCard from '../../atoms/ElementCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../helpers/api';

export default function Playlists() {
  const { userToken } = useSelector((state) => state.auth);
  const [artistArray, setArtistArray] = useState([]);
  useEffect(() => {
    artists();
  }, []);

  const config = {
    headers: {
      token: userToken,
    },
  };

  const artists = async () => {
    await api
      .get('artist/all', config)
      .then((response) => {
        setArtistArray(response.data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
        <Grid item xs={3}>
          <PlaylistCard img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'></PlaylistCard>
        </Grid>
      </Grid>
    </Box>
  );
}
