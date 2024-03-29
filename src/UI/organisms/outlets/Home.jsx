import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../helpers/api';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import AlbumCard from '../../atoms/ElementCard';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

export default function Playlists() {
  const { userToken } = useSelector((state) => state.auth);
  const [artistArray, setArtistArray] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    albums();
    artists();
  }, []);

  const config = {
    headers: {
      token: userToken,
    },
    warn: false,
  };

  const artists = async () => {
    await api
      .get('artist/all', config)
      .then((response) => {
        setArtistArray(response.data);
      })
      .catch((error) => {});
  };

  const albums = async () => {
    await api
      .get('album/all', config)
      .then((response) => {
        setAlbumData(response.data);
        setLoading(false);
      })
      .catch((error) => {});
  };

  return (
    <Box p={3}>
      <Typography variant='h2'>Discover new music</Typography>
      <ImageList cols={10}>
        {artistArray.map((item) => (
          <Link to={`artists/${item?._id}`} style={linkStyle}>
            <ImageListItem key={`${process.env.REACT_APP_API_URL}/media?id=${item._id}`}>
              <img
                src={`${process.env.REACT_APP_API_URL}/media?id=${item._id}`}
                srcSet={`${process.env.REACT_APP_API_URL}/media?id=${item._id}`}
                alt={item.name}
                loading='lazy'
                style={{
                  height: '100px',
                  width: '100px',
                  borderRadius: '50%',
                }}
              />
              <ImageListItemBar
                nowrap
                sx={{
                  textOverflow: 'ellipsis',
                  width: '100px',
                }}
                title={
                  <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                    {item.name}
                  </Typography>
                }
                position='below'
              ></ImageListItemBar>
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
      <Grid container spacing={3}>
        {loading ? (
          <Grid>
            <CircularProgress />
          </Grid>
        ) : (
          albumData.map((album) => (
            <Grid item xs={3} key={album?._id}>
              <Link to={`albums/${album?._id}`} style={linkStyle}>
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
