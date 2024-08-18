import React from 'react'
import Form from '../../Copmponents/FormComponent/Form';

const LoginForm = () => {
  const fields = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ];

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
        alert('Login successful!');
        // You can also set the user data and token in the state or local storage here
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during login.');
    }
  };

  return <Form fields={fields} onSubmit={handleLogin} />;
}

export default LoginForm