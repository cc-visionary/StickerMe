import React from 'react';

import logo from '../../assets/images/login-signup/logo.png';

import '../../assets/styles/pages/Locked.css';

const CustomerLocked = () => (
  <div id="locked-page">
    <div className="notif">
      <img className="logo" src={logo} alt="Logo" />
      <h1 className="error-message">OOPS!</h1>
      <h2 className="error-message">The scrapbook is locked today</h2>
      <h3 className="come-back-message">Come visit anytime from Sunday to Tuesday</h3>
    </div>
  </div>
);

export default CustomerLocked;
