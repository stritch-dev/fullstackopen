import { render, screen } from '@testing-library/react';
import App from './App';

test('renders phonebook', () => {
  render(<App />);
  const linkElement = screen.getByText(/Phonebook/);
  expect(linkElement).toBeInTheDocument();
});

test('renders Numbers', () => {
  render(<App />);
  const linkElement = screen.getByText(/Numbers/);
  expect(linkElement).toBeInTheDocument();
});

test('renders name', () => {
  render(<App />)
  const linkElement = screen.getByText(/name:/);
  expect(linkElement).toBeInTheDocument();
});

