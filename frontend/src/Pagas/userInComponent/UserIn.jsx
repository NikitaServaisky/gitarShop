import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthContext';
import { backEndApi } from '../../api';

const userIn = () => {
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/account/login', { replace: true });
    } else {
      fetchUserData();
    }
  }, [isAuthenticated, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${backEndApi}/account/userin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      setUserData(result);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  return (
    <>
      <h2>Welcome: {userData ? userData.name : 'loading...'}</h2>
      <Outlet />
    </>
  );
};

export default userIn;
