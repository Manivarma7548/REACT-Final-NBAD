import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddExpenditure from '../AddExpenditure';
import axios from 'axios';

jest.mock('axios');

describe('AddExpenditure component', () => {
  it('should render the form with input fields and a submit button', () => {
    render(<AddExpenditure token="dummyToken" />);

    expect(screen.getByLabelText('Category:')).toBeInTheDocument();
    expect(screen.getByLabelText('Number:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Budget' })).toBeInTheDocument();
  });

  it('should display error notifications when input fields are empty', async () => {
    render(<AddExpenditure token="dummyToken" />);
  
    fireEvent.click(screen.getByRole('button', { name: 'Add Budget' }));
  
    await waitFor(() => {
      expect(screen.getByText('Error: Budget Name, Budget Number, and Date are required')).toBeInTheDocument();
    });
  });

  it('should submit the form data, display a success notification, and clear input fields on successful submission', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Budget added successfully' } });

    render(<AddExpenditure token="dummyToken" />);

    const budgetNameInput = screen.getByLabelText('Category:');
    const budgetNumberInput = screen.getByLabelText('Number:');
    const submitButton = screen.getByRole('button', { name: 'Add Budget' });

    fireEvent.change(budgetNameInput, { target: { value: 'Groceries' } });
    fireEvent.change(budgetNumberInput, { target: { value: '100' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Budget added successfully')).toBeInTheDocument();
      expect(budgetNameInput).toHaveValue('');
      expect(budgetNumberInput).toHaveValue('');
    });
  });

  it('should display an error notification when the API request fails', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Error adding budget' } } });

    render(<AddExpenditure token="dummyToken" />);

    const budgetNameInput = screen.getByLabelText('Category:');
    const budgetNumberInput = screen.getByLabelText('Number:');
    const submitButton = screen.getByRole('button', { name: 'Add Budget' });

    fireEvent.change(budgetNameInput, { target: { value: 'Groceries' } });
    fireEvent.change(budgetNumberInput, { target: { value: '100' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Error: Error adding budget')).toBeInTheDocument();
    });
  });
});
