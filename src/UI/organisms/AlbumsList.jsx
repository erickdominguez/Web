import React from 'react';
import AlbumCard from '../molecules/ElementCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { api } from '../../helpers/api';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
};

export default function Playlists() {
  useEffect(() => {
    albums();
  }, []);

  const { tempToken } = useSelector((state) => state.auth);
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const config = {
    headers: {
      token: tempToken,
    },
  };
  const albums = async () => {
    await api
      .get('album/all', config)
      .then((response) => {
        setAlbumData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3} p={3}>
        {loading ? (
          <Grid>
            <CircularProgress />
          </Grid>
        ) : (
          albumData.map((album) => (
            <Grid item xs={3} key={album._id}>
              <Link to={`${album._id}`} style={linkStyle}>
                <AlbumCard
                  img='https://us.123rf.com/450wm/paulcarft/paulcarft2107/paulcarft210700048/paulcarft210700048.jpg?ver=6'
                  title={album.name}
                ></AlbumCard>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
