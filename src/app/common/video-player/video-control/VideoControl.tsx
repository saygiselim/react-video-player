import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faExpand, faPause, faPlay, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import './VideoControl.css';

export const VideoControl = (props: VideoControlProps) => {
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
        return `${Math.round((props.currentTime / props.totalTime) * 100)}%`;
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

        props.skipToTimePoint(getTimePoint(percentage));
    }

    return (
        <div className="video-control">
            <div className="progress-wrapper">
                <div className="bar" onClick={onBarClicked}>
                    <div className="bar-filled" style={{ width: getCurrentBarWidth() }} ></div>
                </div>
            </div>
            <div className="control-wrapper">
                <div className="control">
                    <button type="button" className="btn" onClick={props.toggleMute}>
                        <FontAwesomeIcon icon={props.isMuted ? faVolumeMute : faVolumeUp} />
                    </button>
                    <span className="time time-current">
                        {getFormattedTime(props.currentTime)}
                    </span>
                </div>
                <div className="control">
                    <button type="button" className="btn" onClick={props.togglePlay}>
                        <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} size="2x" />
                    </button>
                </div>
                <div className="control">
                    <span className="time time-total">
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
    togglePlay: () => void;
    toggleMute: () => void;
    toggleFullscreen: () => void;
    skipToTimePoint: (timeInSeconds: number) => void;
}