import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormComponent from '../../Copmponents/FormComponent/Form';
import { backEndApi } from '../../api';

function ResetPassword() {
  const { token } = useParams();
  const [newPass, setNewPass] = useState({ newPassword: '', passwordAgain: '' });

  const fields = [
    { name: 'newPassword', label: 'password', type: 'password', require: true },
    { name: 'passwordAgain', label: 'password again', type: 'password', require: true },
  ];

  useEffect(() => {
    if (newPass) {
      console.log('newPass: ', newPass);
    }
  }, [newPass]);

  const handleInputChange = (e) => {
    // console.log('event: ', e);
    const { name, value } = e.target;

    setNewPass({ ...newPass, [name]: value });
  };

  const handleSubmit = () => {
    handleReset();
  };

  const handleReset = async () => {
    try {
      const response = await fetch(`${backEndApi}/reset-password/${token}`, {
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
