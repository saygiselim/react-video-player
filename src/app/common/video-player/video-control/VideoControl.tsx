import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faCompress, faExpand, faForward, faPause, faPlay, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import './VideoControl.scss';

export const VideoControl = (props: VideoControlProps) => {
    const { currentTime, totalTime, isPlaying, isMuted, isFullscreen, skipBackward, togglePlay, skipForward, toggleMute, toggleFullscreen, skip } = props;

    useEffect(() => {
        const onKeydown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    skipBackward();
                    break;

                case ' ':
                    togglePlay();
                    break;

                case 'ArrowRight':
                    skipForward();
                    break;
            }
        }

        document.addEventListener('keydown', onKeydown);
        return () => document.removeEventListener('keydown', onKeydown);
    }, [skipBackward, togglePlay, skipForward, currentTime, totalTime, isPlaying]);

    const onBarClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        skip(getClickedTimePoint(event));
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
     * Returns seekbar width as percentage based on the current time to represent remaining time on the bar
     */
    const getCurrentBarWidth = () => {
        return `${(currentTime / totalTime) * 100}%`;
    }

    /**
     * Returns a point in time based on the clicked point on the seekbar
     * 
     * @param event mouse event
     */
    const getClickedTimePoint = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const percentage = (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100;

        return Math.round((percentage * totalTime) / 100);
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
                    <button type="button" className="btn" onClick={toggleMute}>
                        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
                    </button>
                    <span className="time">
                        {getFormattedTime(currentTime)}
                    </span>
                </div>
                <div className="control">
                    <button type="button" className="btn btn-primary" onClick={skipBackward}>
                        <FontAwesomeIcon icon={faBackward} size="2x" />
                    </button>
                    <button type="button" className="btn btn-primary" onClick={togglePlay}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="3x" />
                    </button>
                    <button type="button" className="btn btn-primary" onClick={skipForward}>
                        <FontAwesomeIcon icon={faForward} size="2x" />
                    </button>
                </div>
                <div className="control">
                    <span className="time">
                        {getFormattedTime(totalTime)}
                    </span>
                    <button type="button" className="btn" onClick={toggleFullscreen}>
                        <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
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
    isFullscreen: boolean;
    skipBackward: () => void;
    togglePlay: () => void;
    skipForward: () => void;
    toggleMute: () => void;
    toggleFullscreen: () => void;
    skip: (timeInSeconds: number) => void;
}