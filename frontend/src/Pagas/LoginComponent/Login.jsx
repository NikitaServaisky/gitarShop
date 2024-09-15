import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthContext';
import FormComponent from '../../Copmponents/FormComponent/Form';

const LoginForm = () => {
  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const { email, password } = formData;
    try {
      await login(email, password);
      navigate('/account/userin'); // Redirect to the user-in page after login
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <h2>Login</h2>
      <FormComponent fields={fields} onSubmit={handleSubmit} />
      {error && <p>{error}</p>}
    </>
  );
};

export default LoginForm;
