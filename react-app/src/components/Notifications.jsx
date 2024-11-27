import React, { useState } from 'react';
import './styles/Notifications.css';

const Notifications = ({ onClose }) => {
  const [preference, setPreference] = useState('Daily');

  const handleSave = () => {
    console.log(`Preference saved: ${preference}`);
    onClose(); // Close the modal after saving
  };

  return (
    <div className="notification-modal-overlay" onClick={onClose}>
      <div
        className="notification-modal"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Notifications</h2>
        <h3 className="subheading"><b>Expired Fridge Items</b></h3>
        <p>Milk expires by 27-11-2024</p>
        <p>Egg expires by 29-11-2024</p>
        <h3 className="subheading"><b>Notification Preference</b></h3>
        <select
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          className="dropdown"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Notifications;