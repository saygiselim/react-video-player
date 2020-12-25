import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import { VideoInfo, VideoPlayer, VideoPlayerTheme } from './VideoPlayer';

describe('VideoPlayer', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('should render title', () => {
    const videoInfo: VideoInfo = {
      title: 'dummy title',
      posterSrc: 'dummy poster source',
      videoSrc: 'dummy video source'
    };

    act(() => {
      render(
        <VideoPlayer
          videoInfo={videoInfo}
          theme={VideoPlayerTheme.Blue} />,
        container
      );
    });

    const divElement = container.querySelector('.video-title');

    expect(divElement?.textContent).toBe(videoInfo.title);
  });

  it('should render controls', () => {
    const videoInfo: VideoInfo = {
      title: 'dummy title',
      posterSrc: 'dummy poster source',
      videoSrc: 'dummy video source'
    };

    act(() => {
      render(
        <VideoPlayer
          videoInfo={videoInfo}
          theme={VideoPlayerTheme.Blue} />,
        container
      );
    });

    const divElement = container.querySelector('.video-control');

    expect(divElement).toBeTruthy();
  });

  it('should render video element with correct source', () => {
    const videoInfo: VideoInfo = {
      title: 'dummy title',
      posterSrc: 'dummy poster source',
      videoSrc: 'dummy video source'
    };

    act(() => {
      render(
        <VideoPlayer
          videoInfo={videoInfo}
          theme={VideoPlayerTheme.Blue} />,
        container
      );
    });

    const videoElement = container.querySelector('video');

    expect(videoElement?.getAttribute('src')).toBe(videoInfo.videoSrc);
  });

  it('should render image element with poster source', () => {
    const videoInfo: VideoInfo = {
      title: 'dummy title',
      posterSrc: 'dummy poster source',
      videoSrc: 'dummy video source'
    };

    act(() => {
      render(
        <VideoPlayer
          videoInfo={videoInfo}
          theme={VideoPlayerTheme.Blue} />,
        container
      );
    });

    const imgElement = container.querySelector('.video-poster > img');

    expect(imgElement?.getAttribute('src')).toBe(videoInfo.posterSrc);
  });

  it('should not render poster when video is playing and current time greater than zero', () => {
    const videoInfo: VideoInfo = {
      title: 'dummy title',
      posterSrc: 'dummy poster source',
      videoSrc: 'dummy video source'
    };

    act(() => {
      render(
        <VideoPlayer
          videoInfo={videoInfo}
          theme={VideoPlayerTheme.Blue} />,
        container
      );
    });

    act(() => {
      const videoElement = container.querySelector('video');
      if (videoElement) {
        videoElement.currentTime = 1;
        videoElement.dispatchEvent(new Event('timeupdate', { bubbles: true }));
        videoElement.dispatchEvent(new Event('playing', { bubbles: true }));
      }
    });

    const imgElement = container.querySelector('.video-poster > img');

    expect(imgElement).toBeFalsy();
  });

  it('should hide overlay when mouse is in idle for 5 seconds', () => {
    jest.useFakeTimers();

    const videoInfo: VideoInfo = {
      title: 'dummy title',
      posterSrc: 'dummy poster source',
      videoSrc: 'dummy video source'
    };

    act(() => {
      render(
        <VideoPlayer
          videoInfo={videoInfo}
          theme={VideoPlayerTheme.Blue} />,
        container
      );
    });

    act(() => {
      const divElement = container.querySelector('.video-player');
      divElement?.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));

      jest.advanceTimersByTime(5000);
    });

    const divElement = container.querySelector('.video-overlay.is-hidden');

    expect(divElement).toBeTruthy();
  });
});
