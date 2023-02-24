import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { api } from '../../../../helpers/api';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';

export default function UploadSong() {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const gridItemStyle = { width: '100%' };
  const [loading, setLoading] = useState(true);
  const [albumsList, setAlbumsList] = useState([]);
  const [filename, setFilename] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');

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
        setAlbumsList(response?.data?.albums);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      setFilename('No file uploaded');
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    console.log(file);
    setFilename(name);

    setFile(e.target.files[0]);
  };

  const formPreventDefault = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      submitForm();
    }
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    try {
      await api
        .post(`song?id=${album}`, formData, {
          headers: { token: userToken },
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box p={3}>
      <Typography variant='h2'>Upload a new song</Typography>
      <Grid component='form' onKeyUp={formPreventDefault} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            id='outlined-basic'
            label='Album'
            variant='outlined'
            name='album'
            value={album}
            onChange={(event) => {
              setAlbum(event.target.value);
            }}
            sx={gridItemStyle}
            size='small'
          >
            {albumsList.map((option) => (
              <MenuItem key={option.value} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='Tilte'
            variant='outlined'
            name='title'
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            component='label'
            variant='outlined'
            startIcon={<UploadFileIcon />}
            sx={{ marginRight: '1rem' }}
          >
            Select Song
            <input type='file' accept='.mp3' hidden onChange={handleFileUpload} />
          </Button>
          <Box>{filename}</Box>
        </Grid>
      </Grid>
      <Button onClick={() => submitForm()} variant='contained' sx={{ marginTop: '18px' }}>
        Upload
      </Button>
    </Box>
  );
}
