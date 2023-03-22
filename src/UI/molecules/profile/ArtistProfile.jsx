import React from 'react';
import { api } from '../../../helpers/api';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useParams } from 'react-router-dom';
import AlbumCard from '../../atoms/ElementCard';
import { Typography } from '@mui/material';

export default function ArtistProfile() {
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState([]);
  const { userInfo, userToken } = useSelector((state) => state.auth);
  let { id } = useParams();
  const linkStyle = {
    textDecoration: 'none',
  };

  useEffect(() => {
    albums();
  }, []);

  const albums = async () => {
   try {
      const response  = await api.get(`artist?id=${id}`)
      setArtist(response?.data);
      setLoading(false);
   } catch (e) {

   }
  };

  return (
    <Box>
      <Grid container spacing={3} p={5}>
        {loading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
          <Grid item xs={12} gutter={20}>
            <Typography variant="h1" gutterBottom>{artist.name}</Typography>
          </Grid>
          {artist?.albums?.map((album) => (
            <Grid item xs={3} key={album?._id}>
              <Link to={`/albums/${album?._id}`} style={linkStyle}>
                <AlbumCard
                  img={`https://netlify--subtle-alpaca-aedb97.netlify.app/feed//media?id=${album?._id}`}
                  title={album?.name}
                  subtitle={album?.author?.name}
                ></AlbumCard>
              </Link>
            </Grid>
          ))}
          </>
        )}
      </Grid>
    </Box>
  );
}
