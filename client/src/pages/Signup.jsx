import React, { useState } from 'react';
import logo from '../assets/images/logo.png';

import { SpecialInput } from '../components';

import '../assets/styles/pages/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState(null);

  const onRegister = (e) => {
    e.preventDefault();
    console.log([email, username, password, confirmPassword]);
    setSignupError('Invalid Email');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onRegister(e);
    }
  };

  return (
    <div id="signup-page">
      <div className="inner-signup">
        <p className="signup-title">Sign Up</p>
        <img className="logo" src={logo} alt="Logo" />
        <form onSubmit={onRegister}>
          <SpecialInput type="text" value={email} onChange={setEmail} onKeyPress={handleKeyPress} placeholder="Email" required />
          <br />
          <SpecialInput type="text" value={username} onChange={setUsername} onKeyPress={handleKeyPress} placeholder="Username" required />
          <br />
          <SpecialInput type="password" value={password} onChange={setPassword} onKeyPress={handleKeyPress} placeholder="Password" required />
          <br />
          <SpecialInput type="password" value={confirmPassword} onChange={setConfirmPassword} onKeyPress={handleKeyPress} placeholder="Confirm Password" required />
          <br />
          <button className="signup-button" type="submit">Signup</button>
        </form>
        <span className="error-message">
          {signupError}
        </span>
      </div>
    </div>
  );
};

export default Signup;
