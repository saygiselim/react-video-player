import './Dropdown.css';

export const Dropdown = (props: DropdownProps) => {
    return (
        <div className="dropdown">
            <label className="label">{props.label}</label>
            <select className="select" onChange={event => props.onSelect(event.target.value)}>
                {props.options.map(option => <option value={option.value} selected={option.selected}>{option.text}</option>)}
            </select>
        </div>
    )
}

interface DropdownProps {
    label: string;
    options: DropdownOption[];
    onSelect: (value: any) => void;
}

export interface DropdownOption {
    text: string;
    value: any;
    selected?: boolean;
}
