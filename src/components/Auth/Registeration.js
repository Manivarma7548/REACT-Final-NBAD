import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import '../../styles/Registeration.css';

const Registeration = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [RegisterationStatus, setRegisterationStatus] = useState(null);


  const handleRegisteration = async (e) => {
    e.preventDefault();

    try {
      await authService.Registeration(usernameInput, passwordInput, fullNameInput);
      setRegisterationStatus('success');
    } catch (error) {
      console.error('Registeration failed', error);
      setRegisterationStatus('failed');
    }
  };
  useEffect(() => {
    const closeDialog = () => {
      setTimeout(() => setRegisterationStatus(null), 2000);
    };

    if (RegisterationStatus === 'success') {
      closeDialog();
    } else if (RegisterationStatus === 'failed') {
      closeDialog();
    }
  }, [RegisterationStatus]);

  

  return (
    <div className="Registeration-container">
      <h2 className="Registeration-heading">Register</h2>
      <form className="Registeration-form" onSubmit={handleRegisteration}>
        <label className="Registeration-label">
          Full Name:
          <input
            className="Registeration-input"
            type="text"
            value={fullNameInput}
            onChange={(e) => setFullNameInput(e.target.value)}
          />
        </label>
        <label className="Registeration-label">
          Username:
          <input
            className="Registeration-input"
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </label>
        <label className="Registeration-label">
          Password:
          <input
            className="Registeration-input"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </label>
        <button className="Registeration-button" type="submit">
          Sign Up
        </button>

        {RegisterationStatus === 'success' && (
          <div className="dialog success">
            Registeration successful! 
          </div>
        )}
        {RegisterationStatus === 'failed' && (
          <div className="dialog error">Registeration failed. Please try again.</div>
        )}
      </form>
    </div>
  );
};

export default Registeration;
