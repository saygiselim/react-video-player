import { useEffect, useState } from 'react';

import './Dropdown.scss';

export const Dropdown = (props: DropdownProps) => {
    const [selectedOption, setSelectedOption] = useState(props.selectedOption);

    useEffect(() => {
        if (selectedOption)
            props.onSelect(selectedOption);
    }, [selectedOption])

    return (
        <div className="dropdown">
            <label className="label">
                {props.label}
            </label>
            <select
                className="select"
                onChange={event => setSelectedOption(props.options[+event.target.value])}
                defaultValue={props.options.indexOf(selectedOption)}>
                {
                    props.options.map(
                        (option, index) =>
                            <option
                                key={index}
                                value={index}>
                                {option[props.textProperty]}
                            </option>
                    )
                }
            </select>
        </div>
    )
}

interface DropdownProps {
    label: string;
    options: any[];
    textProperty: string;
    selectedOption?: any;
    onSelect: (option: any) => void;
}