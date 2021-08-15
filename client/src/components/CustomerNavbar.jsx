import React from 'react';

import { UserService } from '../services';

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
        <a href="/customer" className={location.pathname === '/customer' ? 'active' : ''}>Home</a>
        <a href="/customer/profile" className={location.pathname === '/customer/profile' ? 'active' : ''}>User</a>
        <a href="/customer/characters" className={location.pathname === '/customer/characters' || location.pathname === '/customer/characters/edit' ? 'active' : ''}>Characters</a>
        <a href="/customer/contacts" className={location.pathname === '/customer/contacts' ? 'active' : ''}>Contacts</a>
        <a href="/customer/orders" className={location.pathname === '/customer/orders' ? 'active' : ''}>Orders</a>
      </div>
      <div>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default CustomerNavbar;
