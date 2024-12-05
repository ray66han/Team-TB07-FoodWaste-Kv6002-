import React, { useState } from 'react';
import './styles/Settings.css';
import Notifications from './Notifications';
import UpdateProfile from './UpdateProfile';

const SettingsPage = ({ show }) => {
  // State to track if the Notifications modal is open
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  // State to track if the Update Profile modal is open
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false); 

  // Hide settings dropdown 
  if (!show) return null;

  return (
    <>
      {/* Dropdown menu */}
      <ul
        className="dropdown-menu show"
        role="menu"
        aria-hidden={!show}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Notifications button */}
        <li role="menuitem">
          <button
            className="action-btn"
            onClick={(e) => {
              e.preventDefault();
              setIsNotificationsOpen(true); // Open Notifications modal
            }}
          >
            Notifications
          </button>
        </li>
         {/* Update Profile button */}
        <li role="menuitem">
          <button
            className="action-btn"
            onClick={(e) => {
              e.preventDefault();
              setIsUpdateProfileOpen(true); // Open Update Profile modal
            }}
          >
            Update Profile
          </button>
        </li>
        {/* Logout button */}
        <li role="menuitem">
          <button
            className="action-btn"
            onClick={(e) => {
              e.preventDefault();
              console.log("Logout clicked!");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
      {/* Render Notifications modal when open */}
      {isNotificationsOpen && (
        <Notifications onClose={() => setIsNotificationsOpen(false)} />
      )}
      {/* Render Update Profile modal when open */}
      {isUpdateProfileOpen && (
        <UpdateProfile onClose={() => setIsUpdateProfileOpen(false)} />
      )}
    </>
  );
};

export default SettingsPage;