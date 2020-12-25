import { useState } from 'react';

import './ImageSelect.scss';

export const ImageSelect = (props: ImageSelectProps) => {
    const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex);

    const selectOption = (option: any, index: number) => {
        setSelectedIndex(index);
        props.onSelect(option);
    }

    return (
        <div className="image-select">
            {
                props.options.map((option, index) =>
                    <div
                        key={index}
                        className={`option ${index === selectedIndex ? 'is-selected' : ''}`}
                        onClick={() => selectOption(option, index)}
                        title={option[props.titleProperty]}>
                        <img
                            src={option[props.imageProperty]}
                            alt={option[props.titleProperty]} />
                    </div>
                )
            }
        </div>
    )
}

interface ImageSelectProps {
    options: any[];
    imageProperty: string;
    titleProperty: string;
    selectedIndex?: number;
    onSelect: (option: any) => void;
}