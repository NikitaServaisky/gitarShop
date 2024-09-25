import React from 'react';
import { useAuth } from '../controllers/AuthContext';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Button from '../Copmponents/ButtonComponent/Button';

const Account = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <>
      <Outlet />
      <Button onClick={handleLogout}>Logout</Button>
      <Link to="/forgot-password">forgot password </Link>
      <Link to="/account/register">register </Link>
    </>
  );
};

export default Account;
