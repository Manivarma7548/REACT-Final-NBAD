import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../logingin';

describe('Login Component', () => {
  test('renders login form', () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getAllByText('Login')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Login')[1]).toBeInTheDocument();
  });

  test('handles login and displays success message', async () => {
    const mockOnLogin = jest.fn();
    render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'arpita' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123' } });
    fireEvent.click(screen.getAllByText('Login')[1]); // Click the second occurrence of "Login" button

    expect(mockOnLogin).toHaveBeenCalled(); // Ensure that the login function was called

    // Check for the success message without waitFor since there's no asynchronous operation
    expect(screen.queryByText('Login successful')).toBeInTheDocument();
  });
});
