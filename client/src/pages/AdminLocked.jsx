import React from 'react';

import logo from '../assets/images/login-signup/logo.png';

import '../assets/styles/pages/AdminLocked.css';

const AdminLocked = () => (
  <div id="admin-locked-page">
    <div className="notif">
      <img className="logo" src={logo} alt="Logo" />
      <h1 className="error-message">OOPS!</h1>
      <h2 className="error-message">The scrapbook is locked today</h2>
      <h3 className="come-back-message">You can only edit styles from Wednesday to Saturday</h3>
    </div>
  </div>
);

export default AdminLocked;
