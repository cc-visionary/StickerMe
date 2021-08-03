import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UserService } from '../services';
import { getUser } from '../utils/store';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    UserService.login(username, password)
      .then(() => {
        if (getUser().userType === 'moderator') props.history.push('/admin');
        else props.history.push('/customer');
      })
      .catch((err) => {
        const { success, error } = err.response.data;
        if (!success) setLoginError(error);
      });
  };

  return (
    <div id="login-page">
      <h1>Login</h1>
      <div>
        <label htmlFor="username">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
        </label>
      </div>
      {loginError && <p>{loginError}</p>}
      <input type="submit" onClick={handleLogin} value="Login" />
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
