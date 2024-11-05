import React, { useEffect, useState } from "react";
import FridgeForm from "./FridgeForm";

const FridgeList = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);  // Form is hidden by default
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleAddButtonClick = () => {
    setEditItem(null);  // Reset edit item
    setShowForm(true);  // Show form
  };

  const handleEditButtonClick = (item) => {
    setEditItem(item);  // Set item to edit
    setShowForm(true);  // Show form
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item._id !== id));
  };

  const handleFormSubmit = (newItem) => {
    setItems((prevItems) => {
      // Update items array if editing, or add if new item
      return editItem
        ? prevItems.map((item) => (item._id === newItem._id ? newItem : item))
        : [...prevItems, newItem];
    });
    setShowForm(false);  // Hide form on submit
  };

  return (
    <div>
      <button onClick={handleAddButtonClick}>Add Item</button>

      {showForm && (
        <FridgeForm 
          editItem={editItem} 
          onClose={() => setShowForm(false)} 
          onSubmit={handleFormSubmit} 
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Expiry Date</th>
            <th>Price (£)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.expiryDate}</td>
              <td>£{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleEditButtonClick(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FridgeList;
