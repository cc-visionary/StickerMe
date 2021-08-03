import React, { useState } from 'react';

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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        />
      </div>
      {loginError && <p>{loginError}</p>}
      <input type="submit" onClick={handleLogin} value="Login" />
    </div>
  );
};

export default Login;
