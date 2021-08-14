import React from 'react';

import { UserService } from '../services';
import { getUser } from '../utils/store';

import logo from '../assets/images/navbar-logo.png';

import '../assets/styles/components/Navbar.css';

const CustomerNavbar = ({ location, history }) => {
  const onLogout = () => {
    UserService.logout().then(() => {
      history.push('/login');
    });
  };

  return (
    <div id="navbar">
      <img src={logo} alt="Logo" />
      <div>
        <a href="/" className={location.pathname === '/' ? 'active' : ''}>Home</a>
        {!getUser() ? <a href="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</a> : <button type="button" onClick={onLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default CustomerNavbar;
