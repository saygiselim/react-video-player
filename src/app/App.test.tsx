import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import { App } from './App';

describe('App', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('should render header with title', () => {
    act(() => {
      render(<App />, container);
    });

    const headerElement = container.querySelector('.header');

    expect(headerElement?.textContent).toBe('React Video Player');
  });

  it('should render body with video player', () => {
    act(() => {
      render(<App />, container);
    });

    const videoPlayerElement = container.getElementsByTagName('VideoPlayer');

    expect(videoPlayerElement).toBeTruthy();
  });

  it('should render footer with copyright message', () => {
    act(() => {
      render(<App />, container);
    });

    const footerElement = container.querySelector('.footer');

    expect(footerElement?.textContent).toBe('Video © Copyright Blender Foundation | https://www.blender.org');
  });
});
