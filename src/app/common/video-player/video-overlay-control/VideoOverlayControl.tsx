import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import './VideoOverlayControl.scss';

export const VideoOverlayControl = (props: VideoOverlayControlProps) => {
    return (
        <div className="video-overlay-control">
            <div className="control" onDoubleClick={props.skipBackward}>
                <FontAwesomeIcon icon={faBackward} size="3x" />
            </div>
            <div className="control" onClick={props.togglePlay}>
                <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} size="6x" />
            </div>
            <div className="control" onDoubleClick={props.skipForward}>
                <FontAwesomeIcon icon={faForward} size="3x" />
            </div>
        </div>
    )
}

interface VideoOverlayControlProps {
    isPlaying: boolean;
    skipBackward: () => void;
    togglePlay: () => void;
    skipForward: () => void;
}