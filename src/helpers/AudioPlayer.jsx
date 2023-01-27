import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ tracks }) => {
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, artist, color, image, audioSrc } = tracks[trackIndex];
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  const toPrevTrack = () => {
    console.log('TODO go to prev');
  };

  const toNextTrack = () => {
    console.log('TODO go to next');
  };
  return (
    <div className='audio-player'>
      <div className='track-info'>
        <img className='artwork' src={image} alt={`track artwork for ${title} by ${artist}`} />
        <h2 className='title'>{title}</h2>
        <h3 className='artist'>{artist}</h3>
      </div>
    </div>
  );
};

export default AudioPlayer;
