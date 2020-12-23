import { useEffect, useState } from 'react';

import './ImageSelect.scss';

export const ImageSelect = (props: ImageSelectProps) => {
    const [selectedOption, setSelectedOption] = useState(props.selectedOption);

    useEffect(() => {
        if (selectedOption)
            props.onSelect(selectedOption);
    }, [selectedOption]);

    return (
        <div className="image-select">
            {
                props.options.map((option, index) =>
                    <div
                        key={index}
                        className={`option ${option[props.imageProperty] === selectedOption[props.imageProperty] ? 'is-selected' : ''}`}
                        onClick={() => setSelectedOption(option)}
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
    selectedOption?: any;
    onSelect: (option: any) => void;
}