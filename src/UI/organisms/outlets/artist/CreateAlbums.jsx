import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import DatePickerAtom from '../../../atoms/DatePickerAtom';
export default function CreateAlbums() {
  const gridItemStyle = { width: '100%' };
  const [filename, setFilename] = useState('');
  const [data, setData] = useState({ name: '', date: '', type: 'ALBUM', img: '' });
  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
    };
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
  const submitForm = (data) => {
    // dispatch(loginUser(data));
  };
  return (
    <Box p={3}>
      <Grid component='form' onKeyUp={formPreventDefault} container spacing={2} marginB={2}>
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
          <DatePickerAtom name='date' setFormData={setData}></DatePickerAtom>
        </Grid>
        <Grid item xs={12}>
          <Button
            component='label'
            variant='outlined'
            startIcon={<UploadFileIcon />}
            sx={{ marginRight: '1rem' }}
          >
            Select cover image
            <input type='file' accept='.png' hidden onChange={handleFileUpload} />
          </Button>
          <Box>{filename}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
