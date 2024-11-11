import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">
      <img src="logo.png" alt="Logo" className="logo" /> ExpiryAlert
    </Link>
    <div className="navbar-nav ml-auto">
      <Link className="nav-item nav-link" to="/fridge">Fridge</Link>
      <Link className="nav-item nav-link" to="/login">Log-In</Link>
      <Link className="nav-item nav-link" to="/settings">Settings</Link>
    </div>
  </nav>
  );
};

export default Navbar;