import React from 'react';
import { api } from '../../../helpers/api';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import AlbumCard from '../../atoms/ElementCard';
export default function ArtistProfile() {
  const [loading, setLoading] = useState(true);
  const [albumsList, setAlbumsList] = useState([]);
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const linkStyle = {
    textDecoration: 'none',
  };
  const config = {
    headers: {
      token: userToken,
    },
  };

  useEffect(() => {
    albums();
  }, []);

  const albums = async () => {
    await api
      .get(`artist?name=${userInfo?.name}`, config)
      .then((response) => {
        setAlbumsList(response?.data?.albums);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  return (
    <Box>
      <Grid container spacing={3} pt={3}>
        {loading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          albumsList.map((album) => (
            <Grid item xs={3} key={album?._id}>
              <Link to={`${album?._id}`} style={linkStyle}>
                <AlbumCard
                  img={`${process.env.REACT_APP_API_URL}/media?id=${album?._id}`}
                  title={album?.name}
                  subtitle={album?.author?.name}
                ></AlbumCard>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
