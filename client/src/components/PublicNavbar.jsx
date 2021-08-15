import React from 'react';

import logo from '../assets/images/navbar-logo.png';

import '../assets/styles/components/PublicNavbar.css';

const PublicNavbar = ({ location }) => (
  <div id="public-navbar">
    <img src={logo} alt="logo" />
    <div>
      <a href="/" className={location.pathname === '/' ? 'active' : ''}>Home</a>
      <a href="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</a>
      <a href="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</a>
    </div>
  </div>
);

export default PublicNavbar;
