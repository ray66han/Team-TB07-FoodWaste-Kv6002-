import React, { useState } from 'react';
import './styles/Settings.css';
import Notifications from './Notifications';
import UpdateProfile from './UpdateProfile';

const SettingsPage = ({ show }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false); 

  if (!show) return null;

  return (
    <>
      <ul
        className="dropdown-menu show"
        role="menu"
        aria-hidden={!show}
        onClick={(e) => e.stopPropagation()}
      >
        <li role="menuitem">
          <button
            className="action-btn"
            onClick={(e) => {
              e.preventDefault();
              setIsNotificationsOpen(true);
            }}
          >
            Notifications
          </button>
        </li>
        <li role="menuitem">
          <button
            className="action-btn"
            onClick={(e) => {
              e.preventDefault();
              setIsUpdateProfileOpen(true);
            }}
          >
            Update Profile
          </button>
        </li>
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
      {isNotificationsOpen && (
        <Notifications onClose={() => setIsNotificationsOpen(false)} />
      )}
      {isUpdateProfileOpen && (
        <UpdateProfile onClose={() => setIsUpdateProfileOpen(false)} />
      )}
    </>
  );
};

export default SettingsPage;