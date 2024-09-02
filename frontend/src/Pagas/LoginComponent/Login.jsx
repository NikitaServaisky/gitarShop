import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthContext';
import Form from '../../Copmponents/FormComponent/Form';
import Button from '../../Copmponents/ButtonComponent/Button';

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
    setFormData({ ...formData, [name]: value });
  }

const handleLogin = async (formData) => {
  try {
    const response = await fetch('http://localhost:3000/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      // Make sure to set the token correctly
      login(result.token);
      alert('Login successful!');
      navigate('/account')
    } else {
      alert(`Login failed: ${result.message}`);
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred during login.');
  }
};

  return (
    <>
      <Form fields={fields} onChange={handleInputChange} onSubmit={handleLogin} />
      <div>
        <Button type="button" text="Login" onClick={handleLogin}>
          {' '}
          Login{' '}
        </Button>
        <Button to="/account/register" type="button">
          {' '}
          Signup{' '}
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
