import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import authService from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const success = await authService.login(email, password);
    if (success) {
      navigate('/tasks');
    } else {
      alert('Invalid credentials');
    }
  };

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;