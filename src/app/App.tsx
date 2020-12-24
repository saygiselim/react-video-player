import React, { useState } from 'react';

import './App.scss';

import { Dropdown } from './common/dropdown/Dropdown';
import { ImageSelect } from './common/image-select/ImageSelect';
import { VideoPlayer, VideoInfo, VideoPlayerTheme } from './common/video-player/VideoPlayer';

export const App = () => {
  const themeOptions = [
    { text: 'Red', value: VideoPlayerTheme.Red },
    { text: 'Green', value: VideoPlayerTheme.Green },
    { text: 'Blue', value: VideoPlayerTheme.Blue }
  ];
  const [currentTheme, setCurrentTheme] = useState(themeOptions[2]);

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
  const [currentVideoInfo, setCurrentVideoInfo] = useState(videoInfos[1]);

  return (
    <div className="app">
      <header className="header">
        React Video Player
      </header>
      <section className="body">
        <VideoPlayer videoInfo={currentVideoInfo} theme={currentTheme.value} />
        <fieldset className="preferences">
          <legend>Preferences</legend>
          <Dropdown
            label="Theme"
            options={themeOptions}
            textProperty="text"
            selectedOption={themeOptions[2]}
            onSelect={option => setCurrentTheme(option)} />
          <hr />
          <ImageSelect
            options={videoInfos}
            imageProperty="posterSrc"
            titleProperty="title"
            selectedOption={videoInfos[1]}
            onSelect={option => setCurrentVideoInfo(option)} />
        </fieldset>
      </section>
      <footer className="footer">
        Video © Copyright Blender Foundation | <a href="https://www.blender.org/about/projects/" target="_blank" rel="noreferrer">https://www.blender.org</a>
      </footer>
    </div >
  )
}