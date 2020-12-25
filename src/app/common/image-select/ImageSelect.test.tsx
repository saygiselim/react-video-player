import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import { ImageSelect } from './ImageSelect';

describe('ImageSelect', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('should list 3 options', () => {
    const options = [
      { title: 'A', image: 'A' },
      { title: 'B', image: 'B' },
      { title: 'C', image: 'C' }
    ];

    act(() => {
      render(
        <ImageSelect
          options={options}
          titleProperty="title"
          imageProperty="image"
          onSelect={() => { }} />,
        container
      );
    });

    const divElements = container.querySelectorAll('.option');

    expect(divElements).toHaveLength(3);
  });

  it('should trigger onSelect with correct option', () => {
    const index = 1;
    const onSelect = jest.fn();
    const options = [
      { title: 'A', image: 'A' },
      { title: 'B', image: 'B' },
      { title: 'C', image: 'C' }
    ];

    act(() => {
      render(
        <ImageSelect
          options={options}
          titleProperty="title"
          imageProperty="image"
          onSelect={onSelect} />,
        container
      );
    });

    act(() => {
      const divElement = container.querySelectorAll(".option")[index];
      divElement?.dispatchEvent(new MouseEvent('click', { bubbles: true }));;
    });

    expect(onSelect).toHaveBeenCalledWith(options[index]);
  });

  it('should select correct option as default', () => {
    const index = 1;
    const onSelect = jest.fn();
    const options = [
      { title: 'A', image: 'A' },
      { title: 'B', image: 'B' },
      { title: 'C', image: 'C' }
    ];

    act(() => {
      render(
        <ImageSelect
          options={options}
          titleProperty="title"
          imageProperty="image"
          selectedIndex={index}
          onSelect={onSelect} />,
        container
      );
    });

    const imgElement = container.querySelector(".option.is-selected > img") as HTMLImageElement;

    expect(imgElement.getAttribute('src')).toBe(options[index].image);
  });
});
