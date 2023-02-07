import React from 'react';
import PlaylistCard from '../molecules/ElementCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect } from 'react';


export default function Playlists() {
  
  useEffect(() => {
    // artists();
  }, [])

  
  const itemData = [
    {
      img: 'https://cdns-images.dzcdn.net/images/artist/82e214b0cb39316f4a12a082fded54f6/500x500.jpg',
      title: 'Avicii',
    },
    {
      img: 'https://media.pitchfork.com/photos/592c550e13d197565213ef49/16:9/w_1280,c_limit/4b594f8c.jpg',
      title: 'Joe Hisaishi'
    },
    {
      img: 'https://media.pitchfork.com/photos/592c550e13d197565213ef49/16:9/w_1280,c_limit/4b594f8c.jpg',
      title: 'Joe Hisaishi'
    },
    {
      img: 'https://readdork.com/wp-content/uploads/2020/11/skott-94.jpg',
      title: 'Skott'
    },
    {
      img: 'https://readdork.com/wp-content/uploads/2020/11/skott-94.jpg',
      title: 'Skott'
    },
    {
      img: 'https://cdns-images.dzcdn.net/images/artist/82e214b0cb39316f4a12a082fded54f6/500x500.jpg',
      title: 'Avicii', 
    },

  ];
  return (
    <Box p={3}>
      <Typography variant='h2'>Discover new music</Typography>
      <ImageList sx={{}} cols={10}>
     
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={item.img}
            srcSet={item.img}
            alt={item.title}
            loading="lazy"
            style={{
              height : '100px',
              width : '100px',
              borderRadius : '50%'
              
            }}
          />
          <ImageListItemBar
            title={item.title}
            position="below"

            
          />
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
