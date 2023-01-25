import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useState, useEffect, useRef } from 'react';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const theme = useTheme();
  const { songId } = useSelector((state) => state.player);
  const audioRef = useRef(new Audio(`http://localhost:4000/api/song?id=${songId}`));
  const [trackProgress, setTrackProgress] = useState(0);
  const isReady = useRef(false);
  const intervalRef = useRef();
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else if (!isPlaying) {
      audioRef.current.pause();
    }
    console.log(isPlaying);
  }, [isPlaying]);

  // useEffect(() => {
  //   // Pause and clean up on unmount
  //   return () => {
  //     audioRef.current.pause();
  //     clearInterval(intervalRef.current);
  //   };
  // }, []);
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(`http://localhost:4000/api/song?id=${songId}`);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        // toNextTrack();
        console.log('end');
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };
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
              <IconButton
                aria-label='play/pause'
                onClick={() => {
                  isPlaying ? setIsPlaying(false) : setIsPlaying(true);
                }}
              >
                {isPlaying ? (
                  <PauseIcon sx={{ height: 38, width: 38 }} />
                ) : (
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                )}
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
