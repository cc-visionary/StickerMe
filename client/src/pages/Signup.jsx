import React, { useState } from "react";
import logo from "../assets/images/logo.png";

import "../assets/styles/pages/Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const onRegister = (e) => {
    e.preventDefault();
    console.log([email, username, password, confirmPassword]);
    setEmailError("Invalid Email");
    setUsernameError("Invalid Username");
    setPasswordError("Invalid Password");
    setConfirmPasswordError("Invalid Confirm Password");
  };

  return (
    <div id="signup-page">
      <p className="signup-title">Sign Up</p>
      <img className="logo" src={logo} alt="Logo" />
      <form onSubmit={onRegister}>
        <div className="input-group">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br />
          <span className="error-message" hidden={!emailError}>
            {emailError}
          </span>
        </div>
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <br />
          <span className="error-message" hidden={!usernameError}>
            {usernameError}
          </span>
        </div>
        <div className="input-group">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />
          <span className="error-message" hidden={!passwordError}>
            {passwordError}
          </span>
        </div>
        <div className="input-group">
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <br />
          <span className="error-message" hidden={!confirmPasswordError}>
            {confirmPasswordError}
          </span>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
