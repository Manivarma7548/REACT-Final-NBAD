import React from 'react';
import { render, screen } from '@testing-library/react';
import AddExpenditureCapacity from '../AddExpenditureCapacity';

describe('AddExpenditureCapacity Component', () => {
  it('should render successfully', () => {
    render(<AddExpenditureCapacity />);

    expect(screen.getByText('Add Budget with this form')).toBeInTheDocument();
    expect(screen.getByRole('select')).toBeInTheDocument();
    expect(screen.getByLabelText('Category:')).toBeInTheDocument();
    expect(screen.getByLabelText('Limit:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Budget' })).toBeInTheDocument();
    expect(screen.getByText('Capacity Data')).toBeInTheDocument();
  });

  it('should fetch capacity data for the selected month', () => {
    const mockGet = jest.spyOn(global, 'fetch');
    mockGet.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([
        { budgetname: 'Food', budgetnumber: 100 },
        { budgetname: 'Entertainment', budgetnumber: 50 },
      ]),
    }));

    render(<AddExpenditureCapacity />);

    expect(mockGet).toHaveBeenCalledWith('/budgets/capacity');

    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('should send a request to the server to add the budget capacity', () => {
    const mockPost = jest.spyOn(global, 'fetch');
    mockPost.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        success: true,
        message: 'Budget capacity added successfully',
      }),
    }));

    render(<AddExpenditureCapacity />);

    screen.getByLabelText('Category:').value = 'Travel';
    screen.getByLabelText('Limit:').value = '200';

    screen.getByRole('button', { name: 'Add Budget' }).click();

    expect(mockPost).toHaveBeenCalledWith('/budgets/capacity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        budgetName: 'Travel',
        budgetNumber: '200',
        selectedMonth: '',
      }),
    });
  });

  it('should display a success message if the budget capacity was added successfully', async () => {
    const mockPost = jest.spyOn(global, 'fetch');
    mockPost.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        success: true,
        message: 'Budget capacity added successfully',
      }),
    }));

    render(<AddExpenditureCapacity />);

    screen.getByLabelText('Category:').value = 'Travel';
    screen.getByLabelText('Limit:').value = '200';

    screen.getByRole('button', { name: 'Add Budget' }).click();

    expect(await screen.findByText('Budget capacity added successfully')).toBeInTheDocument();
  });

  it('should display an error message if the budget capacity was not added successfully', async () => {
    const mockPost = jest.spyOn(global, 'fetch');
    mockPost.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        success: false,
        message: 'Failed to add budget capacity',
      }),
    }));

    render(<AddExpenditureCapacity />);

    screen.getByLabelText('Category:').value = 'Travel';
    screen.getByLabelText('Limit:').value = '200';

    screen.getByRole('button', { name: 'Add Budget' }).click();

    expect(await screen.findByText('Failed to add budget capacity')).toBeInTheDocument();
  });
});
