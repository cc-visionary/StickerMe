import React, { useState } from "react";

import { UserService } from "../services";
import { getUser } from "../utils/common";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    try {
      UserService.login(username, password, remember).then(() => {
        if (getUser().userType === "moderator") props.history.push("/admin");
        else props.history.push("/user");
      });
    } catch (error) {
      setUsernameError("Invalid username");
      setPasswordError("Invalid password");
    }
  };

  return (
    <div id="login-page">
      <h1>Login</h1>
      <form>
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
        <div>
          <input
            type="checkbox"
            value={remember}
            onChange={() => setRemember(!remember)}
            name="remember"
          />
          <span>Remember Me</span>
        </div>
      </form>
      <input type="submit" onClick={handleLogin} value="Login" />
    </div>
  );
};

export default Login;
