import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Check for token in localStorage
  const token = localStorage.getItem('token');

  // If no token or not authenticated, redirect to login
  if (!isAuthenticated || !token) {
    return <Navigate to="/account/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
