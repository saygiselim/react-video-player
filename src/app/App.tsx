import React, { useState } from 'react';

import './App.css';
import { Dropdown, DropdownOption } from './common/dropdown/Dropdown';

import { VideoPlayer, VideoInfo, VideoPlayerTheme } from './common/video-player/VideoPlayer';

export const App = () => {
  const themeOptions: DropdownOption[] = [
    { text: 'Red', value: VideoPlayerTheme.Red, },
    { text: 'Green', value: VideoPlayerTheme.Green, selected: true },
    { text: 'Blue', value: VideoPlayerTheme.Blue },
  ];
  const [theme, setTheme] = useState(VideoPlayerTheme.Green);

  const videoInfo: VideoInfo = {
    title: 'Sintel',
    posterSrc: 'https://durian.blender.org/wp-content/uploads/2010/05/title-Sintel.jpg',
    videoSrc: 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/Sintel.2010.1080p.mkv'
  };

  return (
    <div className="app">
      <header className="header">
        React Video Player
      </header>
      <section className="body">
        <VideoPlayer videoInfo={videoInfo} theme={theme}></VideoPlayer>
        <hr />
        <fieldset className="preferences">
          <legend>Preferences</legend>
          <Dropdown label="Theme" options={themeOptions} onSelect={value => setTheme(value)}></Dropdown>
        </fieldset>
      </section>
      <footer className="footer">
        Video © Copyright Blender Foundation | <a href="https://www.blender.org/" target="_blank" rel="noreferrer">https://www.blender.org/about/projects/</a>
      </footer>
    </div>
  )
}