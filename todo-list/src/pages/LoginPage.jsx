import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    const token = await authService.login(email, password);
    if (token) {
      login(token);
      navigate('/tasks');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;
