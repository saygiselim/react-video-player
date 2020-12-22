import React, { useEffect, useRef, useState } from "react";

import './VideoPlayer.scss';

import { VideoTitle } from "./video-title/VideoTitle";
import { VideoPoster } from "./video-poster/VideoPoster";
import { VideoControl } from "./video-control/VideoControl";
import { VideoOverlayControl } from "./video-overlay-control/VideoOverlayControl";

export const VideoPlayer = (props: VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isInFullScreenMode, setIsInFullScreenMode] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    let videoPlayerElementRef = useRef<HTMLDivElement>(null);
    let videoElementRef = useRef<HTMLVideoElement>(null);

    // Events
    useEffect(() => setIsPlaying(false), [props.videoInfo]);

    useEffect(() => {
        const videoPlayerElement = videoPlayerElementRef.current;
        videoPlayerElement?.addEventListener('webkitfullscreenchange', onFullscreenModeChanged);
        return () => videoPlayerElement?.removeEventListener('webkitfullscreenchange', onFullscreenModeChanged);
    }, []);

    const onLoaded = () => {
        setTotalTime(videoElementRef.current?.duration || 0);
    }

    const onPlaying = () => {
        setIsPlaying(true);
    }

    const onTimeUpdated = () => {
        setCurrentTime(videoElementRef.current?.currentTime || 0);
    }

    const onEnded = () => {
        setIsPlaying(false);
    }

    const onFullscreenModeChanged = () => {
        setIsInFullScreenMode(!!document.fullscreenElement);
    }

    // Behaviors
    /**
     * Plays the video
     */
    const play = () => {
        videoElementRef.current?.play();
        setIsPlaying(true);
    }

    /**
     * Pauses the video
     */
    const pause = () => {
        videoElementRef.current?.pause();
        setIsPlaying(false);
    }

    /**
     * Toggles play state
     */
    const togglePlay = () => {
        isPlaying ? pause() : play();
    }

    /**
     * Toggles volume mode
     */
    const toggleMute = () => {
        const VOLUME_MIN = 0;
        const VOLUME_MAX = 1;

        if (videoElementRef.current)
            videoElementRef.current.volume = isMuted ? VOLUME_MAX : VOLUME_MIN;

        setIsMuted(!isMuted);
    }

    /**
     * Toggles fullscreen mode for webkit based browsers
     * 
     * for more information: https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreen
     */
    const toggleFullscreen = () => {
        !isInFullScreenMode ? (videoPlayerElementRef.current as any).webkitRequestFullScreen() : (document as any).webkitCancelFullScreen();
    }

    /**
     * Sets current time to the given second value
     * 
     * @param timeInSeconds time to be set
     */
    const skipToTimePoint = (timeInSeconds: number) => {
        if (videoElementRef.current)
            videoElementRef.current.currentTime = timeInSeconds;

        setCurrentTime(timeInSeconds);
    }

    const backward = () => {
        if (currentTime > 10 && videoElementRef.current)
            videoElementRef.current.currentTime -= 10;
    }

    const forward = () => {
        if ((totalTime - currentTime) > 10 && videoElementRef.current)
            videoElementRef.current.currentTime += 10;
    }

    return (
        <div
            ref={videoPlayerElementRef}
            className={`video-player theme theme-${props.theme}`} >
            <video
                ref={videoElementRef}
                src={props.videoInfo.videoSrc}
                onLoadedData={onLoaded}
                onPlaying={onPlaying}
                onTimeUpdate={onTimeUpdated}
                onEnded={onEnded}>
                Sorry, Your browser does not support HTML5 video feature
            </video>

            { !isPlaying && currentTime === 0 ? <VideoPoster source={props.videoInfo.posterSrc}></VideoPoster> : null}
            <VideoOverlayControl isPlaying={isPlaying} backward={ backward} togglePlay={togglePlay} forward={forward}></VideoOverlayControl>
            <VideoTitle title={props.videoInfo.title}></VideoTitle>
            <VideoControl
                currentTime={currentTime}
                totalTime={totalTime}
                isPlaying={isPlaying}
                isMuted={isMuted}
                isInFullscreen={isInFullScreenMode}
                togglePlay={togglePlay}
                toggleMute={toggleMute}
                toggleFullscreen={toggleFullscreen}
                skipToTimePoint={skipToTimePoint}></VideoControl>
        </div >
    );
}

interface VideoPlayerProps {
    videoInfo: VideoInfo;
    theme: VideoPlayerTheme;
}

export interface VideoInfo {
    title: string;
    posterSrc: string;
    videoSrc: string;
}

export enum VideoPlayerTheme {
    Red = 'red',
    Green = 'green',
    Blue = 'blue'
}