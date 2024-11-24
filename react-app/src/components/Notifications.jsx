import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications');
        console.log('Fetched notifications:', response.data);
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to load notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Update notification preferences
  const updateNotification = async (id, status) => {
    try {
      const response = await axios.post('/notifications', { id, status });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, status: response.data.status } : item
        )
      );
    } catch (error) {
      console.error('Error updating notification:', error);
      setError('Failed to update notification preferences');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <p>
              {item.name} - Expires on: {item.expiryDate}
            </p>
            <label>
              Enable Notifications:
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => updateNotification(item._id, !item.status)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
