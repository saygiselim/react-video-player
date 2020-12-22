import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faCompress, faExpand, faForward, faPause, faPlay, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import './VideoControl.scss';

export const VideoControl = (props: VideoControlProps) => {
    useEffect(() => {
        document.addEventListener('keydown', onKeydown);
        return () => document.removeEventListener('keydown', onKeydown);
    }, [props.isPlaying, props.currentTime, props.totalTime]);

    const onKeydown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
                props.backward();
                break;

            case ' ':
                props.togglePlay();
                break;

            case 'ArrowRight':
                props.forward();
                break;
        }      
    }

    /**
     * Returns formatted time as 00:00:00
     * 
     * @param timeInSeconds time to be formatted
     */
    const getFormattedTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / (60 * 60));
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        const getZeroPaddedString = (number: number) => {
            return number.toString().padStart(2, '0');
        }

        return `${getZeroPaddedString(hours)}:${getZeroPaddedString(minutes)}:${getZeroPaddedString(seconds)}`;
    }

    /**
     * Returns progress bar width as percentage based on the current time to represent remaining time on the bar
     */
    const getCurrentBarWidth = () => {
        return `${(props.currentTime / props.totalTime) * 100}%`;
    }

    /**
     * Returns a point in time based on the percentage provided
     * 
     * @param percentage time percentage
     */
    const getTimePoint = (percentage: number) => {
        return Math.round((percentage * props.totalTime) / 100);
    }

    const onBarClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const percentage = (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100;

        props.skip(getTimePoint(percentage));
    }

    return (
        <div className="video-control">
            <div className="seekbar-wrapper">
                <div className="seekbar" onClick={onBarClicked}>
                    <div className="seekbar-filled" style={{ width: getCurrentBarWidth() }} ></div>
                </div>
            </div>
            <div className="control-wrapper">
                <div className="control">
                    <button type="button" className="btn" onClick={props.toggleMute}>
                        <FontAwesomeIcon icon={props.isMuted ? faVolumeMute : faVolumeUp} />
                    </button>
                    <span className="time">
                        {getFormattedTime(props.currentTime)}
                    </span>
                </div>
                <div className="control">
                    <button type="button" className="btn btn-primary" onClick={props.backward}>
                        <FontAwesomeIcon icon={faBackward} size="2x" />
                    </button>
                    <button type="button" className="btn btn-primary" onClick={props.togglePlay}>
                        <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} size="3x" />
                    </button>
                    <button type="button" className="btn btn-primary" onClick={props.forward}>
                        <FontAwesomeIcon icon={faForward} size="2x" />
                    </button>
                </div>
                <div className="control">
                    <span className="time">
                        {getFormattedTime(props.totalTime)}
                    </span>
                    <button type="button" className="btn" onClick={props.toggleFullscreen}>
                        <FontAwesomeIcon icon={props.isInFullscreen ? faCompress : faExpand} />
                    </button>
                </div>
            </div>
        </div>
    );
}

interface VideoControlProps {
    currentTime: number;
    totalTime: number;
    isPlaying: boolean;
    isMuted: boolean;
    isInFullscreen: boolean;
    backward: () => void;
    togglePlay: () => void;
    forward: () => void;
    toggleMute: () => void;
    toggleFullscreen: () => void;
    skip: (timeInSeconds: number) => void;
}