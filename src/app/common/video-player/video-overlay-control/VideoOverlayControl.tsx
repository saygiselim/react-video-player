import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import './VideoOverlayControl.css';

export const VideoOverlayControl = (props: VideoOverlayControlProps) => {
    return (
        <div className="video-overlay-control">
            <div className="overlay-control" onDoubleClick={props.backward}>
                <FontAwesomeIcon icon={faBackward} size="3x" />
            </div>
            <div className="overlay-control" onClick={props.togglePlay}>
                <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} size="6x" />
            </div>
            <div className="overlay-control" onDoubleClick={props.forward}>
                <FontAwesomeIcon icon={faForward} size="3x" />
            </div>
        </div>
    )
}

interface VideoOverlayControlProps {
    isPlaying: boolean;
    backward: () => void;
    togglePlay: () => void;
    forward: () => void;
}

