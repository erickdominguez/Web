import ReactPlayer from 'react-player';
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
export default function PlayerTest() {
  const Sound = ({ soundFileName, ...rest }) => (
    <audio autoPlay src={`sounds/${soundFileName}`} {...rest} />
  );
  return (
    <ReactAudioPlayer
      src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      autoPlay
      controls
    />
  );
}
