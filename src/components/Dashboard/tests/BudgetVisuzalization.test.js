import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BudgetVisualization from '../BudgetVisualization';
import apiService from '../../services/apiService';

jest.mock('../../services/apiService');

describe('BudgetVisualization component', () => {
  it('should render the loading message when fetching data', async () => {
    render(<BudgetVisualization token="dummyToken" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the charts and select box when data is fetched', async () => {
    const budgetData = [
      { budgetname: 'Groceries', budgetnumber: 100 },
      { budgetname: 'Rent', budgetnumber: 500 },
      { budgetname: 'Utilities', budgetnumber: 150 },
    ];

    const budgetCapacityData = [
      { budgetname: 'Groceries', budgetnumber: 200 },
      { budgetname: 'Rent', budgetnumber: 700 },
      { budgetname: 'Utilities', budgetnumber: 175 },
    ];

    apiService.get.mockResolvedValueOnce({ data: budgetData });
    apiService.get.mockResolvedValueOnce({ data: budgetCapacityData });

    render(<BudgetVisualization token="dummyToken" />);

    await waitFor(() => {
      expect(screen.getByText('Expenditure V/S Budget')).toBeInTheDocument();
      expect(screen.getByText('Expenditure In Pie Chart')).toBeInTheDocument();
      expect(screen.getByText('Budget vs Cumulative Expenditure')).toBeInTheDocument();
    });
  });

  it('should render the "no data" message when no budget data is available', async () => {
    apiService.get.mockResolvedValueOnce({ data: [] });

    render(<BudgetVisualization token="dummyToken" />);

    await waitFor(() => {
      expect(screen.getByText('No budget data available.')).toBeInTheDocument();
    });
  });

  it('should render the "no data" message when no budget capacity data is available', async () => {
    const budgetData = [
      { budgetname: 'Groceries', budgetnumber: 100 },
      { budgetname: 'Rent', budgetnumber: 500 },
      { budgetname: 'Utilities', budgetnumber: 150 },
    ];

    apiService.get.mockResolvedValueOnce({ data: budgetData });
    apiService.get.mockResolvedValueOnce({ data: [] });

    render(<BudgetVisualization token="dummyToken" />);

    await waitFor(() => {
      expect(screen.getByText('No budget data available.')).toBeInTheDocument();
    });
  });
});
