import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { SpecialInput } from '../components';
import { UserService } from '../services';
import { getUser } from '../utils/store';

import logo from '../assets/images/login-signup/logo.png';
import notebook from '../assets/images/login-signup/notebook.png';

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
          else props.history.push('/customer');
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
      <div className="scrapbook" hidden={hiddenImage}>
        <img src={notebook} alt="Notebook" onLoad={() => setHiddenImage(false)} />
        <a className="create-an-account" href="/signup">
          Create an account
        </a>
        <button type="button" className="login-button" onClick={handleLogin}>
          Log In
        </button>
      </div>
      <div className="login-form">
        <img className="logo" src={logo} alt="Logo" />
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
          <span className="login-error">{loginError}</span>
        </form>
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
