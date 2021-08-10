import React from 'react';

import logo from '../assets/images/navbar-logo.png';

import '../assets/styles/components/Navbar.css';

const AdminNavbar = ({ location }) => (
  <div id="navbar">
    <img src={logo} alt="logo" />
    <div>
      <a href="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Features</a>
      <a href="/admin/orders" className={location.pathname === '/admin/orders' ? 'active' : ''}>Orders</a>
    </div>
  </div>
);

export default AdminNavbar;
