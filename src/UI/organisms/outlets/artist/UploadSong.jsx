import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { api } from '../../../../helpers/api';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { setShow, setMessage, setType } from '../../../../features/alert/alertSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
export default function UploadSong() {
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const { show } = useSelector((state) => state.alert);
  const gridItemStyle = { width: '100%' };
  const [albumsList, setAlbumsList] = useState([]);
  const [filename, setFilename] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [files, setFiles] = useState([]);
  const pond = useRef(null);
  useEffect(() => {
    albums();
  }, []);
  const config = {
    headers: {
      token: userToken,
    },
  };

  const { enqueueSnackbar } = useSnackbar();

  const albums = async () => {
    await api
      .get(`artist?name=${userInfo?.name}`, config)
      .then((response) => {
        setAlbumsList(response?.data?.albums);
      })
      .catch((error) => {});
  };

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      setFilename('No file uploaded');
      return;
    }
    const file = e.target.files[0];
    const { name } = file;

    setFilename(name);

    setFile(e.target.files[0]);
  };

  const formPreventDefault = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      submitForm();
    }
  };

  const submitForm = () => {
    const formData = new FormData();
    formData.append('song', pond.current.getFile(0).file);
    formData.append('title', title);
    console.log(pond.current.getFile(0).file);
    enqueueSnackbar(title, {
      autoHideDuration: null,
      persist: true,
      variant: 'progress',
      data: formData,
      album: album,
      userToken: userToken,
    });
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
          <FilePond
            ref={pond}
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            name='files' /* sets the file input name, it's filepond by default */
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </Grid>
      </Grid>

      <Button onClick={() => submitForm()} variant='contained' sx={{ marginTop: '18px' }}>
        Upload
      </Button>
    </Box>
  );
}
