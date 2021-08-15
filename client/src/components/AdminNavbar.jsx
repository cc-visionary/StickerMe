import React from 'react';

import { UserService } from '../services';

import logo from '../assets/images/navbar-logo.png';

import '../assets/styles/components/Navbar.css';

const AdminNavbar = ({ location, history }) => {
  const onLogout = () => {
    UserService.logout().then(() => {
      history.push('/login');
    });
  };

  return (
    <div id="navbar">
      <img src={logo} alt="logo" />
      <div>
        <a href="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Features</a>
        <a href="/admin/orders" className={location.pathname === '/admin/orders' ? 'active' : ''}>Orders</a>
        <button type="button" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminNavbar;
