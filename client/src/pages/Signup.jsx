import React, { useState } from 'react';

import { UserService } from '../services';
import { SpecialInput } from '../components';

import logo from '../assets/images/logo.png';
import signupBackground from '../assets/images/signup/signup-background.png';

import '../assets/styles/pages/Signup.css';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState(null);

  const onRegister = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      UserService.addUser({
        username, email, password, userType: 'customer',
      })
        .then(() => {
          UserService.login(username, password)
            .then(() => {
              props.history.push('/customer');
            })
            .catch((err) => {
              const { error } = err.response.data;
              setSignupError(error);
            });
        })
        .catch((err) => {
          const { error } = err.response.data;
          setSignupError(error);
        });
    } else {
      setSignupError("Password and confirm password doesn't match...");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onRegister();
    }
  };

  return (
    <div id="signup-page">
      <div className="inner-signup">
        <div className="blob">
          <img src={signupBackground} alt="Signup Background" />
          <img className="logo" src={logo} alt="Logo" />
          <button className="signup-button" type="submit" onClick={onRegister}>Sign up</button>
          <p className="error-message">
            {signupError}
          </p>
        </div>
        <form>
          <SpecialInput type="text" value={email} onChange={setEmail} onKeyPress={handleKeyPress} placeholder="Email" />
          <br />
          <SpecialInput type="text" value={username} onChange={setUsername} onKeyPress={handleKeyPress} placeholder="Username" />
          <br />
          <SpecialInput type="password" value={password} onChange={setPassword} onKeyPress={handleKeyPress} placeholder="Password" />
          <br />
          <SpecialInput type="password" value={confirmPassword} onChange={setConfirmPassword} onKeyPress={handleKeyPress} placeholder="Confirm Password" />
          <br />
        </form>
      </div>
    </div>
  );
};

export default Signup;
