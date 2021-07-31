import React, { useState } from "react";

import { UserService } from "../services";
import { getUser } from "../utils/store";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const handleLogin = () => {
    try {
      UserService.login(username, password).then(() => {
        if (getUser().userType === "moderator") props.history.push("/admin");
        else props.history.push("/customer");
      });
    } catch (error) {
      setUsernameError("Invalid username");
      setPasswordError("Invalid password");
    }
  };

  return (
    <div id="login-page">
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username</label>
        {usernameError && <p>{usernameError}</p>}
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
        {passwordError && <p>{passwordError}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        />
      </div>
      <input type="submit" onClick={handleLogin} value="Login" />
    </div>
  );
};

export default Login;
