import React, { useState } from "react";

import { UserService } from "../services";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const submitLogin = () => {
    try {
      console.log([username, password, remember]);
      UserService.login(username, password, remember).then(() => {
        props.history.push("/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
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
      <input type="submit" onClick={() => submitLogin()} value="Login" />
    </div>
  );
};

export default Login;
