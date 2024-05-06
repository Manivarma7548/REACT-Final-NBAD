import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import Registeration from '../Registeration'; 
import authService from '../../services/authService';

jest.mock('../../services/authService');

describe('Registeration Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Registration form', () => {
    render(<Registeration />);
    const registrationHeading = screen.getByRole('heading', { name: 'Sign Up' });
    const registrationButton = screen.getByRole('button', { name: 'Sign Up' });

    expect(registrationHeading).toBeInTheDocument();
    expect(registrationButton).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  test('handles Registration and displays success message', async () => {
    render(<Registeration />);
    userEvent.type(screen.getByLabelText('Full Name:'), 'John Doe');
    userEvent.type(screen.getByLabelText('Username:'), 'john_doe');
    userEvent.type(screen.getByLabelText('Password:'), 'password123');
    fireEvent.submit(screen.getByRole('form')); // Submit the form

    await waitFor(() => {
      expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    });
  });
});
