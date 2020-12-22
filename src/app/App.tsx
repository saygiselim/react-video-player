import React, { useState } from 'react';

import './App.scss';

import { Dropdown } from './common/dropdown/Dropdown';
import { VideoPlayer, VideoInfo, VideoPlayerTheme } from './common/video-player/VideoPlayer';

export const App = () => {
  const themeOptions = [
    { text: 'Red', value: VideoPlayerTheme.Red },
    { text: 'Green', value: VideoPlayerTheme.Green },
    { text: 'Blue', value: VideoPlayerTheme.Blue },
  ];
  const [theme, setTheme] = useState(themeOptions[0].value);

  const videoInfos: VideoInfo[] = [
    {
      title: 'Big Buck Bunny - 2008',
      posterSrc: 'https://www.blender.org/wp-content/uploads/2013/07/poster-bigbuckbunny.jpg',
      videoSrc: 'https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_stereo.ogg'
    },
    {
      title: 'Sintel - 2010',
      posterSrc: 'https://www.blender.org/wp-content/uploads/2013/07/poster-sintel.jpg',
      videoSrc: 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/Sintel.2010.1080p.mkv'
    },
    {
      title: 'Tears of Steel - 2012',
      posterSrc: 'https://www.blender.org/wp-content/uploads/2013/07/poster-tearsofsteel.jpg',
      videoSrc: 'http://media.xiph.org/mango/tears_of_steel_1080p.webm'
    }
  ];
  const [videoInfo, setVideoInfo] = useState(videoInfos[0]);

  return (
    <div className="app">
      <header className="header">
        React Video Player
      </header>
      <hr />
      <section className="body">
        <VideoPlayer videoInfo={videoInfo} theme={theme}></VideoPlayer>
        <fieldset className="preferences">
          <legend>Preferences</legend>
          <Dropdown label="Theme" options={themeOptions} textProperty="text" onSelect={option => setTheme(option.value)}></Dropdown>
          <Dropdown label="Video" options={videoInfos} textProperty="title" onSelect={option => setVideoInfo(option)}></Dropdown>
        </fieldset>
      </section>
      <hr />
      <footer className="footer">
        Video © Copyright Blender Foundation | <a href="https://www.blender.org/about/projects/" target="_blank" rel="noreferrer">https://www.blender.org</a>
      </footer>
    </div>
  )
}