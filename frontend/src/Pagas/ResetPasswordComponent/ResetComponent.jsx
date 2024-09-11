import React from 'react';
import { useState, useEffect } from 'react';
import FormComponent from '../../Copmponents/FormComponent/Form';

function ResetPassword() {
  const [newPass, setNewPass] = useState({ 'new password': '', 'password again': '' });
  const [token, setToken] = useState('');

  // Extract token from the URL
useEffect(() => {
  const currentUrl = window.location.href;
  const tokenFromUrl = currentUrl.split('/').pop(); // Extracts the token
  setToken(tokenFromUrl);
}, []);


  const fields = [
    { name: 'new password', label: 'password', tpye: 'password', require: true },
    { name: 'password again', label: 'password again', tpye: 'password', require: true },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPass({ ...newPass, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReset(newPass);
  };

  const handleReset = async (newPass) => {
    try {
      const response = await fetch(`http://localhost:3000/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPass),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Password reset successful', result);
      } else {
        alert('Password reset failed', result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <FormComponent fields={fields} onChange={handleInputChange} onSubmit={handleSubmit} />;
}

export default ResetPassword;
