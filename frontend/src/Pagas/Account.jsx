import React, { useEffect } from 'react';
import { useAuth } from '../controllers/AuthContext';
import { Outlet, replace, useNavigate } from 'react-router-dom';

const Account = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to homepage after logout
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/account/login', { replace: true });
    } else {
      navigate('/account/userin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Account;
