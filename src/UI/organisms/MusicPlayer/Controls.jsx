import React from 'react';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => (
  <div className='flex items-center justify-around md:w-36 lg:w-52 2xl:w-80'>
    <RepeatIcon
      size={20}
      color={repeat ? 'red' : 'white'}
      onClick={() => setRepeat((prev) => !prev)}
      className='hidden sm:block cursor-pointer'
    />
    {currentSongs?.length && (
      <SkipPreviousIcon
        size={30}
        color='#FFF'
        className='cursor-pointer'
        onClick={handlePrevSong}
      />
    )}
    {isPlaying ? (
      <PauseIcon size={45} color='#FFF' onClick={handlePlayPause} className='cursor-pointer' />
    ) : (
      <PlayArrowIcon size={45} color='#FFF' onClick={handlePlayPause} className='cursor-pointer' />
    )}
    {currentSongs?.length && (
      <SkipNextIcon size={30} color='#FFF' className='cursor-pointer' onClick={handleNextSong} />
    )}
    <ShuffleIcon
      size={20}
      color={shuffle ? 'red' : 'white'}
      onClick={() => setShuffle((prev) => !prev)}
      className='hidden sm:block cursor-pointer'
    />
  </div>
);

export default Controls;
