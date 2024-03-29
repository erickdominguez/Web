import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useRef } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import DatePickerAtom from '../../../atoms/DatePickerAtom';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { api } from '../../../../helpers/api';
import { setShow, setMessage, setType } from '../../../../features/alert/alertSlice';
import { useDispatch } from 'react-redux';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
export default function CreateAlbums() {
  const { userToken } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  const gridItemStyle = { width: '100%' };
  const dispatch = useDispatch();
  const [filename, setFilename] = useState('');
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({ name: '', date: '', type: 'ALBUM' });
  const pond = useRef(null);

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
      submitForm(data);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitForm = async (data) => {
    const formData = new FormData();

    formData.append('img', pond.current.getFile(0).file);
    formData.append('name', data.name);
    formData.append('type', data.type);
    formData.append('date', data.date);
    await api
      .post(`album?key=${userInfo?._id}`, formData, {
        headers: { token: userToken, 'Content-Type': '*/*' },
      })
      .then((data) => {
        dispatch(setShow(true));
        dispatch(setMessage('Album Created'));
        dispatch(setType('success'));
        return data;
      })
      .catch(function (error) {
        dispatch(setShow(true));
        dispatch(setMessage('An error ocurred, invalid data'));
        dispatch(setType('error'));
        return error.response?.status;
      });
  };

  return (
    <Box p={3}>
      <Typography variant='h2'>Create new album</Typography>
      <Grid component='form' onKeyUp={formPreventDefault} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='Name'
            variant='outlined'
            name='name'
            onChange={handleFormChange}
            sx={gridItemStyle}
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <DatePickerAtom label='Date' name='date' setFormData={setData}></DatePickerAtom>
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
      <Button onClick={() => submitForm(data)} variant='contained'>
        Create
      </Button>
    </Box>
  );
}
