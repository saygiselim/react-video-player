import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders header with title', () => {
  render(<App />);
  const linkElement = screen.getByText(/React Video Player/i);
  expect(linkElement).toBeInTheDocument();
});
