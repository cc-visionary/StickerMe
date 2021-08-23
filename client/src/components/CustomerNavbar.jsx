import React, { useState } from 'react';

import { UserService } from '../services';

import logo from '../assets/images/navbar-logo.png';
import menu from '../assets/images/icons/Menu.png';

import '../assets/styles/components/Navbar.css';

const links = [
  {
    link: '/customer',
    title: 'Home',
  },
  {
    link: '/customer/profile',
    title: 'User',
  },
  {
    link: '/customer/characters',
    title: 'Characters',
  },
  {
    link: '/customer/contacts',
    title: 'Contacts',
  },
  {
    link: '/customer/orders',
    title: 'Orders',
  },
];

const CustomerNavbar = ({ location, history }) => {
  const [toggle, setToggle] = useState(false);

  const handleLogout = () => {
    UserService.logout().then(() => {
      history.push('/login');
    });
  };

  return (
    <div id="navbar">
      <div className="desktop-nav">
        <img className="logo" src={logo} alt="logo" />
        <div>
          {
            links.map((link) => (
              <a href={link.link} className={location.pathname === link.link ? 'active' : ''}>{link.title}</a>
            ))
          }
        </div>
        <div>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="mobile-nav">
        <img className="logo" src={logo} alt="logo" />
        <div>
          <button className="menu-button" type="button" onClick={() => setToggle(!toggle)}>
            <img src={menu} alt="Menu" />
          </button>
          <ul className={toggle ? 'nav-links show-nav' : 'nav-links'}>
            {links.map((link) => <li href={link.link}><a href={link.link} className={location.pathname === link.link ? 'active' : ''}>{link.title}</a></li>)}
            <button type="button" onClick={handleLogout}>Logout</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerNavbar;
