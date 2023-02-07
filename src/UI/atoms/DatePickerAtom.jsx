import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function MaterialUIPickers(props) {
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const gridItemStyle = { width: '100%' };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label='Date desktop'
        inputFormat='DD/MM/YYYY'
        value={value}
        name={props.name}
        onChange={() => console.log(value)}
        renderInput={(params) => <TextField {...params} />}
        size='small'
        sx={gridItemStyle}
      />
    </LocalizationProvider>
  );
}
