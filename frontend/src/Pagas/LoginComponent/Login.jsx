import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthContext';
import FormComponent from '../../Copmponents/FormComponent/Form';
import { backEndApi } from '../../api';

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const fields = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Field Name:', name, 'Value:', value);
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (formData) => {
    try {
      const response = await fetch(backEndApi + '/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Login Response:', result); // Debugging log

      if (response.ok) {
        login(result.token); // Save token using login function
        alert('Login successful!');
        navigate('/account');
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } catch (err) {
      console.error('Error during fetch operation:', err);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <>
      <FormComponent fields={fields} onChange={handleInputChange} onSubmit={handleLogin} />
      <Link to="/forgot-password">Forget password</Link>
    </>
  );
};

export default LoginForm;
