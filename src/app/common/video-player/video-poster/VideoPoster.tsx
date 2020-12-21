import './VideoPoster.css';

export const VideoPoster = (props: VideoPosterProps) => {
    return (
        <div className="video-poster">
            <img src={props.source} alt="poster"/>
        </div>
    );
}

interface VideoPosterProps {
    source: string;
}