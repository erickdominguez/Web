import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function MaterialUIPickers(props) {
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const gridItemStyle = { width: '100%' };

  const toStringDate = (newValue) => {
    let month;
    if (newValue.$M >= 9) {
      month = newValue.$M + 1;
    } else {
      month = newValue.$M + 1;
      month = '0' + month;
    }

    let day;
    if (newValue.$D >= 10) {
      day = newValue.$D;
    } else {
      day = '0' + newValue.$D;
    }

    let date = newValue.$y + '/' + month + '/' + day;
    props.setFormData((prevState) => {
      return {
        ...prevState,
        [props.name]: date,
      };
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label='Date'
        inputFormat='DD/MM/YYYY'
        value={value}
        name={props.name}
        onChange={(newValue) => {
          setValue(newValue);
          toStringDate(newValue);
        }}
        renderInput={(params) => <TextField size='small' sx={gridItemStyle} {...params} />}
      />
    </LocalizationProvider>
  );
}
