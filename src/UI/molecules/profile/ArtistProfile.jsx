import React from 'react';
import { api } from '../../../helpers/api';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
export default function ArtistProfile() {
  const [loading, setLoading] = useState(true);
  const [albumsList, setAlbumsList] = useState();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  useEffect(() => {
    albums();
  }, []);
  const config = {
    headers: {
      token: userToken,
    },
  };
  const albums = async () => {
    await api
      .get(`artist?name=${userInfo?.name}`, config)
      .then((response) => {
        console.log(response.data);
        setAlbumsList(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  return <Box>HEY</Box>;
}
