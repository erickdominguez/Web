import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useEffect } from 'react';
import { api } from '../../helpers/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  height: '39px',
  marginBottom: '7px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '94%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const iconResult = (type) => {
  if (type === 'song') {
    return <AudiotrackIcon />;
  } else if (type === 'album') {
    return <AlbumIcon />;
  }
  return <PersonIcon />;
};
export default function SearchAppBar() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const handleSearch = async (search) => {
    if (search && search.length > 0) {
      setLoading(true);
      const { data } = await api.get(`/song/search?search=${search}`);
      setResults(data);
      setLoading(true);
    }
  };

  useEffect(() => {}, []);
  const linkStyle = {
    textDecoration: 'none',
  };
  return (
    <Autocomplete
      id='search'
      sx={{ width: 250 }}
      options={results}
      loading={loading}
      getOptionLabel={(option) => option.name || option.title}
      groupBy={(option) => option.type}
      loadingText='Searching...'
      disabledItemsFocusable={true}
      renderOption={(props, option) => {
        return (
          <Box
            {...props}
            onClick={() => {
              if (option.type === 'album') {
                navigate(`${option.type}s/${option?._id}`);
              }
            }}
          >
            {iconResult(option.type)}
            <p style={{ fontSize: 11, marginLeft: 10 }}>{`  ${option.name || option.title}`}</p>
          </Box>
        );
      }}
      renderInput={(params) => <StyledInputBase {...params} placeholder='Search…' />}
      onInputChange={(event, newInputValue) => {
        handleSearch(newInputValue);
      }}
    />
  );
}
