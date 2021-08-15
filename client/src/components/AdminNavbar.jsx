import React from 'react';

import { UserService } from '../services';

import logo from '../assets/images/navbar-logo.png';

import '../assets/styles/components/Navbar.css';

const AdminNavbar = ({ location, history }) => {
  const handleLogout = () => {
    UserService.logout().then(() => {
      history.push('/login');
    });
  };

  return (
    <div id="navbar">
      <img src={logo} alt="logo" />
      <div>
        <a href="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Home</a>
        <a href="/admin/users" className={location.pathname === '/admin/users' ? 'active' : ''}>Users</a>
        <a href="/admin/features" className={location.pathname === '/admin/features' ? 'active' : ''}>Features</a>
        <a href="/admin/orders" className={location.pathname === '/admin/orders' ? 'active' : ''}>Orders</a>
      </div>
      <div>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminNavbar;
