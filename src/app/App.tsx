import React from 'react';

import './App.css';

import { VideoPlayer, VideoInfo } from './common/video-player/VideoPlayer';

export const App = () => {
  const videoInfo: VideoInfo = {
    title: 'Sintel',
    posterSrc: 'https://durian.blender.org/wp-content/uploads/2010/05/title-Sintel.jpg',
    videoSrc: 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/Sintel.2010.1080p.mkv'
  };

  return (
    <div className="app">
      <header>
        <h2 className="header">
          React Video Player
      </h2>
      </header>
      <section>
        <div className="video-player-wrapper">
          <VideoPlayer videoInfo={videoInfo}></VideoPlayer>
        </div>
      </section>
      <footer style={{ textAlign: 'center' }}>
        Video © Copyright Blender Foundation | <a href="https://www.sintel.org" target="_blank">www.sintel.org</a>
      </footer>
    </div>
  )
}