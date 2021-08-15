import React from 'react';

import { UserService } from '../services';
import { getUser } from '../utils/store';

import logo from '../assets/images/navbar-logo.png';

import '../assets/styles/components/Navbar.css';

const CustomerNavbar = ({ location, history }) => {
  const handleLogout = () => {
    UserService.logout().then(() => {
      history.push('/login');
    });
  };

  return (
    <div id="navbar">
      <img src={logo} alt="Logo" />
      <div>
        <a href="/" className={location.pathname === '/' ? 'active' : ''}>Home</a>
        <a href="/create-sticker" className={location.pathname === '/create-sticker' ? 'active' : ''}>Create</a>
        <a href="/history" className={location.pathname === '/history' ? 'active' : ''}>History</a>
        {getUser() ? <button type="button" onClick={handleLogout}>Logout</button> : <a href="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</a>}
      </div>
    </div>
  );
};

export default CustomerNavbar;
