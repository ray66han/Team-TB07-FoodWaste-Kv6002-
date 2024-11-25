import React, { useState } from 'react';
import './styles/Settings.css';

const SettingsPage = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <ul className="dropdown-menu show">
      <li>
        <a href="/notifications">Notifications</a>
      </li>
      <li>
        <a href="#" onClick={(e) => e.preventDefault()}>Update Profile</a>
      </li>
      <li>
        <a href="#" onClick={(e) => e.preventDefault()}>Logout</a>
      </li>
    </ul>
  );
};

export default SettingsPage;
