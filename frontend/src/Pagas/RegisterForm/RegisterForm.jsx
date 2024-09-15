import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormComponent from '../../Copmponents/FormComponent/Form';
import Button from '../../Copmponents/ButtonComponent/Button';
import { backEndApi } from '../../api';

const RegisterForm = () => {
  const navigate = useNavigate();

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'secondName', label: 'Second Name', type: 'text', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'tel', label: 'Telephone', type: 'tel', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ];

  const handleRegister = async (formData) => {
    try {
      const response = await fetch(`${backEndApi}/account/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
        navigate('/account');
      } else {
        alert(`User registration failed: ${result.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while registering the user.');
    }
  };

  return (
    <>
      <FormComponent fields={fields} onSubmit={handleRegister} />
      <Button>Cancel</Button>
    </>
  );
};

export default RegisterForm;
