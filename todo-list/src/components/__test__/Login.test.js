import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login/Login';

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login onLogin={() => { }} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('calls onLogin with email and password', () => {
    const handleLogin = jest.fn();
    render(<Login onLogin={handleLogin} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));
    expect(handleLogin).toHaveBeenCalledWith('user@example.com', 'password');
  });
});