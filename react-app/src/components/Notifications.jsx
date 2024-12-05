import React, { useState, useEffect } from "react";
import "./styles/Notifications.css";
import config from './config.json';

const Notifications = ({ onClose }) => {
  const apiUrl = config.API_URL;
  const [preference, setPreference] = useState("Daily"); // Default notification preference
  const [expiringItems, setExpiringItems] = useState([]); // Store fetched items
  const [loading, setLoading] = useState(false);

  // Fetch expiring items
  const fetchExpiringItems = async (timeframe) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/api/expiring-items?timeframe=${timeframe.toLowerCase()}`
      );
      const data = await response.json();
      setExpiringItems(data.items);
    } catch (error) {
      console.error("Failed to fetch expiring items:", error);
    }
    setLoading(false);
  };

  // Load preference and fetch expiring items when modal opens
  useEffect(() => {
    const loadPreferenceAndItems = async () => {
      try {
        const savedPreference = localStorage.getItem("notificationPreference");
        const preferenceToUse = savedPreference || "Daily";
        setPreference(preferenceToUse); // Update preference state
        await fetchExpiringItems(preferenceToUse); // Fetch items based on loaded preference
      } catch (error) {
        console.error("Failed to load preference or items:", error);
      }
    };

    loadPreferenceAndItems();
  }, []);  

  // Fetch expiring items whenever the preference changes
  useEffect(() => {
    fetchExpiringItems(preference);
  }, [preference]);

  // Save preference to localStorage and refetch expiring items
  const handleSave = async () => {
    try {
      localStorage.setItem("notificationPreference", preference);
      console.log(`Preference saved: ${preference}`);
      await fetchExpiringItems(preference); // Refetch items based on the saved preference
      onClose(); 
    } catch (error) {
      console.error("Failed to save preference:", error);
    }
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
        <h3 className="subheading">
          <b>Expiring Fridge Items</b>
        </h3>
        {loading ? (
          <p>Loading...</p>
        ) : expiringItems.length > 0 ? (
          <ul>
            {expiringItems.map((item) => (
              <li key={item._id}>
                {item.name} expires by {item.expiryDate} {/* Display item details */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items expiring within the selected time frame.</p>
        )}
        <h3 className="subheading">
          <b>Notification Preference</b>
        </h3>
        <select
          value={preference}
          onChange={(e) => setPreference(e.target.value)} // Update preference on change
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
