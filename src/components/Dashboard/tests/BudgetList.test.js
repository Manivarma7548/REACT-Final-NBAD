import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BudgetList from '../BudgetList';
import apiService from '../../services/apiService';

jest.mock('../../services/apiService');

describe('BudgetList component', () => {
  it('should render the loading message while fetching data', () => {
    render(<BudgetList token="dummyToken" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the "no data" message when no budgets are available', async () => {
    apiService.get.mockResolvedValueOnce({ data: [] });

    render(<BudgetList token="dummyToken" />);

    await waitFor(() => {
      expect(screen.getByText('No budget data available.')).toBeInTheDocument();
    });
  });

  it('should render the budget table when budgets are available', async () => {
    const budgets = [
      { id: 1, budgetname: 'Groceries', budgetnumber: 100 },
      { id: 2, budgetname: 'Rent', budgetnumber: 500 },
      { id: 3, budgetname: 'Utilities', budgetnumber: 150 },
    ];

    const capacityData = [
      { budgetname: 'Groceries', budgetnumber: 200 },
      { budgetname: 'Rent', budgetnumber: 700 },
      { budgetname: 'Utilities', budgetnumber: 175 },
    ];

    apiService.get.mockResolvedValueOnce({ data: budgets });
    apiService.get.mockResolvedValueOnce({ data: capacityData });

    render(<BudgetList token="dummyToken" />);

    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
      expect(screen.getByText('Rent')).toBeInTheDocument();
      expect(screen.getByText('Utilities')).toBeInTheDocument();
      expect(screen.getByText('Remaining Balance')).toBeInTheDocument();
    });
  });

  it('should update the budget table when the selected month changes', async () => {
    const januaryBudgets = [
      { id: 1, budgetname: 'Groceries', budgetnumber: 150 },
      { id: 2, budgetname: 'Rent', budgetnumber: 600 },
      { id: 3, budgetname: 'Utilities', budgetnumber: 200 },
    ];

    const februaryBudgets = [
      { id: 1, budgetname: 'Groceries', budgetnumber: 100 },
      { id: 2, budgetname: 'Rent', budgetnumber: 500 },
      { id: 3, budgetname: 'Utilities', budgetnumber: 150 },
    ];

    apiService.get.mockResolvedValueOnce({ data: januaryBudgets });
    apiService.get.mockResolvedValueOnce({ data: februaryBudgets });

    render(<BudgetList token="dummyToken" />);

    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
      expect(screen.getByText('Rent')).toBeInTheDocument();
      expect(screen.getByText('Utilities')).toBeInTheDocument();
    });

    const selectElement = screen.getByRole('combobox');
    selectElement.value = '2';
    fireEvent.change(selectElement);

    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
      expect(screen.getByText('Rent')).toBeInTheDocument();
      expect(screen.getByText('Utilities')).toBeInTheDocument();
    });
  });
});
