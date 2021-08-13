import React, { useState } from 'react';

import { UserService } from '../services';
import { SpecialInput } from '../components';

import logo from '../assets/images/logo.png';
import signupBackground from '../assets/images/signup/signup-background.png';

import '../assets/styles/pages/Signup.css';

const Signup = (props) => {
  const [hiddenImage, setHiddenImage] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState(null);

  const validateField = () => {
    // email validation
    if (email === '') {
      setSignupError("Sorry, we don't accept empty emails.");
      return false;
    }

    // username validation
    if (username === '') {
      setSignupError("Sorry, we don't accept empty usernames.");
      return false;
    }

    if (username.length < 4) {
      setSignupError('Username cannot be less than 4 characters');
      return false;
    }

    if (!/(?=.*\d)/.test(username)) {
      setSignupError('Username has to contain atleast 1 digit');
      return false;
    }

    if (!/(?=(.*\W))/.test(username)) {
      setSignupError('Username has to contain atleast 1 special character');
      return false;
    }

    if (!/(?=.*[a-z])/.test(username)) {
      setSignupError('Username has to contain atleast 1 lower case alphabet');
      return false;
    }

    if (!/(?=.*[A-Z])/.test(username)) {
      setSignupError('Username has to contain atleast 1 upper case alphabet');
      return false;
    }

    // password validation
    if (password === '') {
      setSignupError("Sorry, we don't accept empty passwords.");
      return false;
    }

    if (password.length < 12) {
      setSignupError('Password cannot be less than 12 characters');
      return false;
    }

    if (password !== confirmPassword) {
      setSignupError("Password and confirm password doesn't match...");
      return false;
    }

    if (!/(?=.*\d)/.test(password)) {
      setSignupError('Password has to contain atleast 1 digit');
      return false;
    }

    if (!/(?=(.*\W))/.test(password)) {
      setSignupError('Password has to contain atleast 1 special character');
      return false;
    }

    if (!/(?=.*[a-z])/.test(password)) {
      setSignupError('Password has to contain atleast 1 lower case alphabet');
      return false;
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      setSignupError('Password has to contain atleast 1 upper case alphabet');
      return false;
    }

    // email validation
    const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reEmail.test(email)) {
      setSignupError('Invalid email format.');
      return false;
    }

    return true;
  };

  const onRegister = () => {
    if (validateField()) {
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
        <div className="blob" hidden={!hiddenImage}>
          <img src={signupBackground} alt="Signup Background" onLoad={() => setHiddenImage(true)} />
          <img className="logo" src={logo} alt="Logo" onLoad={() => setHiddenImage(true)} />
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
