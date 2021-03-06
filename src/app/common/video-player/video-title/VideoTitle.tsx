import './VideoTitle.scss';

export const VideoTitle = (props: VideoTitleProps) => {
    return (
        <div className="video-title">
            {props.title}
        </div>
    );
}

interface VideoTitleProps {
    title: string;
}