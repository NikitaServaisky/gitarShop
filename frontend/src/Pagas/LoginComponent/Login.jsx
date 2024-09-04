import React, { useState } from 'react';
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
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior

  //   try {
  //     const response = await fetch('http://localhost:3000/account/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       login(result.token);
  //       alert('Login successful!');
  //       navigate('/account');
  //     } else {
  //       alert(`Login failed: ${result.message}`);
  //     }
  //   } catch (err) {
  //     console.error('Error during login:', err);
  //     alert('An error occurred during login.');
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:3000/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is not OK (e.g., 4xx or 5xx HTTP status code)
      if (!response.ok) {
        const result = await response.json(); // Parse JSON from response body
        const errorMessage = result.message || 'Unknown error occurred';
        alert(`Login failed: ${errorMessage}`);
        return;
      }

      // If the response is OK, continue with login
      const result = await response.json(); // Parse JSON from response body
      login(result.token); // Save token or perform login action
      alert('Login successful!');
      navigate('/account'); // Navigate to the account page
    } catch (err) {
      console.error('Error during fetch operation:', err);
      alert('An error occurred during login. Please try again later.');
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <Form fields={fields} onChange={handleInputChange} />
      <div>
        <Button type="submit" text="Login">
          Login
        </Button>
        <Button to="/account/register" type="button">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
