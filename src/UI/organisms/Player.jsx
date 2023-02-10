import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import React, { useEffect, useRef } from 'react';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import { useSelector } from 'react-redux';
export default function Player({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
  handlePlayPause,
}) {
  const theme = useTheme();
  const ref = useRef(null);
  const stylePlaying = {
    left: 0,
    bottom: 0,
    bgcolor: 'background.default',
    width: '100%',
    height: '150px',
    display: 'inline-flex',
    position: 'fixed',
    borderBlockColor: 'palette.divider',
  };
  const styleNotPlaying = {
    left: 0,
    bottom: 0,
    bgcolor: 'background.default',
    width: '100%',
    height: '0px',
    display: 'inline-flex',
    position: 'fixed',
    borderBlockColor: 'palette.divider',
  };
  const { songArtist, songTitle, isActive, songImg } = useSelector((state) => state.player);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <Box
      component='nav'
      sx={{
        height: { sm: '150px' },
        flexShrink: { sm: 0 },
        zIndex: 0,
      }}
      aria-label='player container'
    >
      <audio
        src={activeSong}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
      />
      <Box sx={isActive ? stylePlaying : styleNotPlaying} aria-label='player' component='nav'>
        {isActive ? (
          <Box sx={{ flexDirection: 'row', display: 'contents' }}>
            <CardMedia
              component='img'
              sx={{ maxWidth: 151 }}
              image={songImg}
              alt='Live from space album cover'
            />
            <Box sx={{ display: 'block', alignItems: 'center', pl: 1, pb: 1 }}>
              <Box>
                <Typography component='div' variant='h5'>
                  {songTitle}
                </Typography>
                <Typography variant='subtitle1' color='text.secondary' component='div'>
                  {songArtist}
                </Typography>
              </Box>
              <Box>
                <IconButton aria-label='previous'>
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label='play/pause' onClick={handlePlayPause}>
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
        ) : null}
      </Box>
    </Box>
  );
}
