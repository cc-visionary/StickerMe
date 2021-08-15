import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { SpecialInput } from '../components';
import { UserService } from '../services';
import { getUser } from '../utils/store';

import logo from '../assets/images/login-signup/logo.png';

import '../assets/styles/pages/Login.css';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [hiddenImage, setHiddenImage] = useState(true);

  const validateFields = () => {
    // make sures that username isn't empty
    if (username === '') {
      setLoginError("Sorry, we don't accept empty usernames.");
      return false;
    }

    // make sures that password isn't empty
    if (password === '') {
      setLoginError("Sorry, we don't accept empty passwords.");
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (validateFields()) {
      UserService.login(username, password)
        .then(() => {
          if (getUser().userType === 'moderator') props.history.push('/admin');
          else props.history.push('/create-sticker');
        })
        .catch((err) => {
          const { success, error } = err.response.data;
          if (!success) setLoginError(error);
          setPassword('');
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div id="login-page">
      <div className="inner-login" hidden={hiddenImage}>
        <img className="logo" src={logo} alt="Logo" onLoad={() => setHiddenImage(false)} />
        <h1 className="login-title">THIS SCRAPBOOK BELONGS TO...</h1>
        <form>
          <SpecialInput
            type="text"
            value={username}
            onChange={setUsername}
            name="username"
            placeholder="Username"
            onKeyPress={handleKeyPress}
            required
          />
          <br />
          <SpecialInput
            type="password"
            value={password}
            onChange={setPassword}
            name="password"
            placeholder="Password"
            onKeyPress={handleKeyPress}
            required
          />
          <br />
        </form>
        <span className="error-message">{loginError}</span>
        <div className="buttons">
          <a className="create-an-account" href="/signup">Register</a>
          <button type="button" className="login" onClick={handleLogin}>Log In</button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Login.defaultProps = {
  history: null,
};

export default Login;
