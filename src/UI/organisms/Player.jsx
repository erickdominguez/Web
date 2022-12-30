import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function Player() {
  const theme = useTheme();
  return (
    <Box
      component='nav'
      sx={{
        height: { sm: '150px' },
        flexShrink: { sm: 0 },
        zIndex: 0,
      }}
      aria-label='mailbox folders'
    >
      <Box
        sx={{
          left: 0,
          bottom: 0,
          bgcolor: 'background.default',
          width: '100%',
          height: '150px',
          display: 'inline-flex',
          position: 'fixed',
          borderBlockColor: 'palette.divider',
        }}
        aria-label='mailbox folders'
        component='nav'
      >
        <Box sx={{ flexDirection: 'row', display: 'contents' }}>
          <CardMedia
            component='img'
            sx={{ maxWidth: 151 }}
            image='https://i.iheart.com/v3/re/new_assets/57f5174d654b9edfd3e746eb'
            alt='Live from space album cover'
          />
          <Box sx={{ display: 'block', alignItems: 'center', pl: 1, pb: 1 }}>
            <Box>
              <Typography component='div' variant='h5'>
                Live From Space
              </Typography>
              <Typography variant='subtitle1' color='text.secondary' component='div'>
                Mac Miller
              </Typography>
            </Box>
            <Box>
              <IconButton aria-label='previous'>
                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
              </IconButton>
              <IconButton aria-label='play/pause'>
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label='next'>
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
