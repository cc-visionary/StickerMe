import React from 'react';

import logo from '../assets/images/navbar-logo.png';

import '../assets/styles/components/Navbar.css';

const CustomerNavbar = ({ location }) => (
  <div id="navbar">
    <img src={logo} alt="Logo" />
    <div>
      <a href="/" className={location.pathname === '/' ? 'active' : ''}>Home</a>
      <a href="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</a>
    </div>
  </div>
);

export default CustomerNavbar;
