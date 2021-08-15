import React from 'react';

import Logo from '../assets/images/login-signup/logo.png';
import Notebook from '../assets/images/login-signup/notebook.png';

import '../assets/styles/pages/Locked.css';

const Locked = () => (
  <div id="date-notif">
    <div className="scrapbook">
      <img src={Notebook} alt="Notebook" />
    </div>
    <div className="notif">
      <img className="logo" src={Logo} alt="Logo" />
      <h1 className="error-message first-line-message">Oops!</h1>
      <h2 className="error-message second-line-message">The scrapbook is locked today</h2>
      <h3 className="come-back-message">Come visit anytime from Sunday to Tuesday</h3>
    </div>
  </div>
);

export default Locked;
