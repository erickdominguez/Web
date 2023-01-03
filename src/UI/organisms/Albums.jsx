import React from 'react';
import AlbumCard from '../molecules/ElementCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { api } from '../../helpers/api';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

export default function Playlists() {
  useEffect(() => {
    albums();
  }, []);

  const [albumData, setAlbumData] = useState([]);

  const albums = async () => {
    await api
      .get('album/all')
      .then((response) => {
        setAlbumData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  return (
    <Box>
      <Grid container spacing={3} p={3}>
        {albumData.map((album) => (
          <Grid item xs={3}>
            <AlbumCard
              img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'
              title={album.name}
            ></AlbumCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
