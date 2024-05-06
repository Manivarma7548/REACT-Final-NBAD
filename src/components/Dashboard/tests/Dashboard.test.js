import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';

jest.mock('../../Auth/AuthCxt', () => ({
  useAuth: () => ({
    logout: jest.fn(),
    refreshAccessToken: jest.fn(),
    checkTokenExpiration: jest.fn(),
  }),
}));

jest.mock('../../AddExpenditureCapacity', () => ({
  __esModule: true,
  default: () => <div data-testid="AddExpenditureCapacityComponent">Add Budget Capacity Component</div>,
}));

jest.mock('../AddExpenditure', () => ({
  __esModule: true,
  default: () => <div data-testid="AddExpenditure">Add Budget Component</div>,
}));

jest.mock('../BudgetList', () => ({
  __esModule: true,
  default: () => <div data-testid="BudgetList">Budget List Component</div>,
}));

jest.mock('../BudgetVisuzalization', () => ({
  __esModule: true,
  default: () => <div data-testid="BudgetVisuzalization">Budget Chart Component</div>,
}));

describe('Dashboard component', () => {
  it('should display the logout button', () => {
    render(<Dashboard />);
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();
  });

  it('should display the navigation bar with buttons for budget list, budget chart, add budget, and add budget capacity', () => {
    render(<Dashboard />);
    const navigationBar = screen.getByRole('navigation');
    expect(navigationBar).toBeInTheDocument();

    const buttons = ['Budget List', 'Budget Chart', 'Add Budget', 'Add Budget Capacity'];

    buttons.forEach(buttonText => {
      const button = screen.getByRole('button', { name: buttonText });
      expect(button).toBeInTheDocument();
    });
  });

  it('should display the AddExpenditure component when the "Add Budget" button is clicked', () => {
    render(<Dashboard />);
    const AddExpenditureButton = screen.getByRole('button', { name: 'Add Budget' });
    fireEvent.click(AddExpenditureButton);

    const AddExpenditureComponent = screen.getByTestId('AddExpenditure');
    expect(AddExpenditureComponent).toBeInTheDocument();
  });

  it('should display the BudgetList component when the "Budget List" button is clicked', () => {
    render(<Dashboard />);
    const budgetListButton = screen.getByRole('button', { name: 'Budget List' });
    fireEvent.click(budgetListButton);

    const budgetListComponent = screen.getByTestId('BudgetList');
    expect(budgetListComponent).toBeInTheDocument();
  });

  it('should display the BudgetVisuzalization component when the "Budget Chart" button is clicked', () => {
    render(<Dashboard />);
    const BudgetVisuzalizationButton = screen.getByRole('button', { name: 'Budget Chart' });
    fireEvent.click(BudgetVisuzalizationButton);

    const BudgetVisuzalizationComponent = screen.getByTestId('BudgetVisuzalization');
    expect(BudgetVisuzalizationComponent).toBeInTheDocument();
  });

  it('should display the AddExpenditureCapacity component when the "Add Budget Capacity" button is clicked', () => {
    render(<Dashboard />);
    const AddExpenditureCapacityButton = screen.getByRole('button', { name: 'Add Budget Capacity' });
    fireEvent.click(AddExpenditureCapacityButton);

    const AddExpenditureCapacityComponent = screen.getByTestId('AddExpenditureCapacityComponent');
    expect(AddExpenditureCapacityComponent).toBeInTheDocument();
  });
});
