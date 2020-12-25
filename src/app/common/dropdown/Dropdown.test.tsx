import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('should have label as "dropdown"', () => {
    act(() => {
      render(
        <Dropdown
          label="dropdown"
          options={[]}
          textProperty=""
          onSelect={() => { }} />,
        container
      );
    });

    const labelElement = container.querySelector('label');

    expect(labelElement?.textContent).toBe('dropdown');
  });

  it('should list 3 options', () => {
    const options = [
      { text: 'A', value: 'A' },
      { text: 'B', value: 'B' },
      { text: 'C', value: 'C' }
    ];

    act(() => {
      render(
        <Dropdown
          label="dropdown"
          options={options}
          textProperty="text"
          onSelect={() => { }} />,
        container
      );
    });

    const optionElements = container.querySelectorAll('select option');

    expect(optionElements).toHaveLength(3);
  });

  it('should trigger onSelect with correct option', () => {
    const index = 1;
    const onSelect = jest.fn();
    const options = [
      { text: 'A', value: 'A' },
      { text: 'B', value: 'B' },
      { text: 'C', value: 'C' }
    ];

    act(() => {
      render(
        <Dropdown
          label="dropdown"
          options={options}
          textProperty="text"
          onSelect={onSelect} />,
        container
      );
    });

    act(() => {
      const selectElement = container.querySelector("select");
      if (selectElement) {
        selectElement.value = index.toString();
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));;
      }
    });

    expect(onSelect).toHaveBeenCalledWith(options[index]);
  });

  it('should select correct option as default', () => {
    const index = 1;
    const onSelect = jest.fn();
    const options = [
      { text: 'A', value: 'A' },
      { text: 'B', value: 'B' },
      { text: 'C', value: 'C' }
    ];

    act(() => {
      render(
        <Dropdown
          label="dropdown"
          options={options}
          textProperty="text"
          selectedIndex={index}
          onSelect={onSelect} />,
        container
      );
    });

    const optionElement = container.querySelector("option[selected]");

    expect(optionElement?.textContent).toBe(options[index].text);
  });
});
