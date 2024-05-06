import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../AuthCxt'; 
import authService from '../../services/authService'; 

jest.mock('../../services/authService');

describe('AuthCxt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides authentication context and hooks', async () => {
    authService.login.mockResolvedValue('mocked-token');

    const TestComponent = () => {
      const { login, authToken } = useAuth();

      const handleLogin = async () => {
        try {
          await login('mocked-token');
        } catch (error) {
          // Handle error if needed
        }
      };

      return (
        <div>
          <span data-testid="token">{authToken}</span>
          <button data-testid="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Click the login button
    await act(async () => {
      fireEvent.click(screen.getByTestId('login-button'));
    });

    // Wait for login function to be called and verify token
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('mocked-token');
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('token').textContent).toBe('mocked-token');
    });
  });
});
