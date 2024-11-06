import React from 'react';
import './styles/Navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src="logo.png" alt="Logo" className="logo" /> ExpiryAlert
      </a>
      <div className="navbar-nav ml-auto">
        <a className="nav-item nav-link" href="/my-fridge">My Fridge</a>
        <a className="nav-item nav-link" href="/profile">Username</a>
        <a className="nav-item nav-link" href="/settings">Settings</a>
      </div>
    </nav>
  );
};

export default NavBar;
