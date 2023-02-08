import React from 'react';
import PlaylistCard from '../molecules/ElementCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../helpers/api';

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
      <Typography variant='h2'>Discover new music</Typography>
      <ImageList sx={{}} cols={10}>
        {artistArray.map((item) => (
          <ImageListItem key={`http://localhost:4000/api/media?id=${item._id}`}>
            <img
              src={`http://localhost:4000/api/media?id=${item._id}`}
              srcSet={`http://localhost:4000/api/media?id=${item._id}`}
              alt={item.name}
              loading='lazy'
              style={{
                height: '100px',
                width: '100px',
                borderRadius: '50%',
              }}
            />
            <ImageListItemBar title={item.name} position='below' />
          </ImageListItem>
        ))}
      </ImageList>
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
