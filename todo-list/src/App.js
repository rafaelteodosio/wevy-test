import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import TaskPage from './pages/TaskPage';

const ProtectedRoute = lazy(() => import('./components/ProtectedRoute/ProtectedRoute'));

const App = () => {
  return (
    <AuthProvider>
      <Suspense>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TaskPage />} />
            </Route>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Router>
      </Suspense>
    </AuthProvider>
  );
};

export default App;