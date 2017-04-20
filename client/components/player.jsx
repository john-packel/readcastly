import React from 'react';
import AudioPlayer from 'react-responsive-audio-player';

const Player = ({track}) => (
  <div className="audio-player">
  {
    (track.url === null)
    ? <AudioPlayer autoplay cycle={false} playlist={[{url: 'https://s3.amazonaws.com/readcastly-user-files/readcastly-welcome-part01.mp3', displayText: 'Welcome to ReadCast.ly!'}, {url: 'https://s3.amazonaws.com/readcastly-user-files/readcastly-welcome-part02.mp3', displayText: 'Welcome to ReadCast.ly (continued)'}]} hideBackSkip={true} style={{ position: 'fixed', bottom: 0 }} />

    : <AudioPlayer autoplay cycle={false} playlist={[{url: track.url, displayText: track.title}]} hideBackSkip={true} style={{ position: 'fixed', bottom: 0 }} />
  }
  </div>
);

export default Player;
