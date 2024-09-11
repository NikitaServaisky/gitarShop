import React, { useEffect } from 'react';
import { useAuth } from '../controllers/AuthContext';
import { Outlet, useNavigate, Link } from 'react-router-dom';

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
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div>Account</div>
      <Outlet />
    </>
  );
};

export default Account;
