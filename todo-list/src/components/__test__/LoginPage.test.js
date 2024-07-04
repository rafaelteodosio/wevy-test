import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import { AuthProvider } from '../../context/AuthContext';
import authService from '../../services/authService';

jest.mock('../../services/authService');

describe('LoginPage', () => {
  test('successful login navigates to /tasks', async () => {
    const mockLogin = jest.fn().mockResolvedValue('dummy-token');
    authService.login = mockLogin;

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/tasks" element={<div>Task Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password'));

    await waitFor(() => {
      expect(screen.getByText('Task Page')).toBeInTheDocument();
    });
  });

  test('unsuccessful login shows alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });
    authService.login = jest.fn().mockResolvedValue(null);

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/tasks" element={<div>Task Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => expect(authService.login).toHaveBeenCalledWith('invalid@test.com', 'wrongpassword'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Credenciais inválidas');
    });
  });
});
