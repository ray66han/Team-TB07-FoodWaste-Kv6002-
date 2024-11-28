import React, { useState } from 'react';
import './styles/UpdateProfile.css';

const UpdateProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    console.log('Updated Profile:', formData);
    onClose(); // Close the modal after updating
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div
        className="profile-modal"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Update Profile</h2>
        <h3 className="subheading">Personal Info</h3>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="input-field"
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input-field"
        />
        <h3 className="subheading">Change Password</h3>
        <label>Old Password</label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleInputChange}
          className="input-field"
        />
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          className="input-field"
        />
        <button className="update-btn" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;