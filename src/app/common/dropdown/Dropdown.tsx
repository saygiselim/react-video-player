import './Dropdown.css';

export const Dropdown = (props: DropdownProps) => {
    return (
        <div className="dropdown">
            <label className="label">{props.label}</label>
            <select className="select" onChange={event => props.onSelect(props.options[+event.target.value])}>
                {props.options.map((option, index) => <option key={index} value={index}>{option[props.textProperty]}</option>)}
            </select>
        </div>
    )
}

interface DropdownProps {
    label: string;
    options: any[];
    textProperty: string;
    onSelect: (option: any) => void;
}