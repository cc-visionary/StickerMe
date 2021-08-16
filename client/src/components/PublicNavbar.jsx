import React, { useState } from 'react';

import logo from '../assets/images/navbar-logo.png';
import menu from '../assets/images/icons/Menu.png';

import '../assets/styles/components/PublicNavbar.css';

const links = [
  {
    link: '/',
    title: 'Home',
  },
  {
    link: '/login',
    title: 'Login',
  },
];

const PublicNavbar = ({ location }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div id="public-navbar">
      <div className="desktop-nav">
        <img src={logo} alt="logo" />
        <div>
          {
          links.map((link) => (
            <a href={link.link} className={location.pathname === link.link ? 'active' : ''}>{link.title}</a>
          ))
          }
          <a href="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</a>
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
            <li href="/signup" style={{ borderBottom: 'none' }}><a href="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublicNavbar;
