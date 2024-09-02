import React from 'react';
import FormComponent from '../../Copmponents/FormComponent/Form';
import Button from '../../Copmponents/ButtonComponent/Button';

const RegisterForm = () => {
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
      const response = await fetch('http://localhost:3000/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
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
      <Button>Register</Button>
      <Button>Cancel</Button>
    </>
  );
};

export default RegisterForm;
