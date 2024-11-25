import React, { useState, useEffect } from "react";
import axios from "axios";

function NotificationsPage() {
  const [preference, setPreference] = useState(3); // Default: Notify 3 days before expiry
  const [expiringItems, setExpiringItems] = useState([]);

  // Fetch items close to expiry
  useEffect(() => {
    const fetchExpiringItems = async () => {
      try {
        const response = await axios.get(`/api/notifications?days=${preference}`);
        setExpiringItems(response.data);
      } catch (error) {
        console.error("Error fetching expiring items:", error);
      }
    };
    fetchExpiringItems();
  }, [preference]);

  // Save notification preference
  const savePreference = async () => {
    try {
      await axios.post("/api/notifications/preference", { days: preference });
      alert("Notification preference saved!");
    } catch (error) {
      console.error("Error saving preference:", error);
    }
  };

  return (
    <div>
      <h1>Notifications</h1>
      <div>
        <label>Notify me X days before expiry:</label>
        <select value={preference} onChange={(e) => setPreference(Number(e.target.value))}>
          {[1, 2, 3, 5, 7].map((day) => (
            <option key={day} value={day}>
              {day} days
            </option>
          ))}
        </select>
        <button onClick={savePreference}>Save</button>
      </div>
      <h2>Expiring Items</h2>
      <ul>
        {expiringItems.length > 0 ? (
          expiringItems.map((item) => (
            <li key={item._id}>
              {item.name} - Expires on {new Date(item.expiryDate).toLocaleDateString()}
            </li>
          ))
        ) : (
          <p>No items expiring soon.</p>
        )}
      </ul>
    </div>
  );
}

export default NotificationsPage;

