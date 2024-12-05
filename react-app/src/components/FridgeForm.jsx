import React, { useState, useEffect } from "react";
import "./styles/FridgeForm.css";
import config from './config.json';

// Component for editing/adding to the list of fridge items
const FridgeForm = ({ editItem, onClose, onSubmit }) => {
  const apiUrl = config.API_URL;
  // Initialize form state with existing item data 
  const [name, setName] = useState(editItem ? editItem.name : "");
  const [expiryDate, setExpiryDate] = useState(editItem ? editItem.expiryDate : "");
  const [price, setPrice] = useState(editItem ? editItem.price : "");
  const [quantity, setQuantity] = useState(editItem ? editItem.quantity : "");
  const [category, setCategory] = useState(editItem ? editItem.category : "");

  const today = new Date().toISOString().split("T")[0];  // Get todays date

  // Predefined categories for selection
  const categories = ["Dairy", "Meat", "Vegetables", "Fruits", "Beverages", "Miscellaneous"];

  useEffect(() => {
    // Update form fields if editing an item
    if (editItem) {
      setName(editItem.name);
      setExpiryDate(editItem.expiryDate);
      setPrice(editItem.price);
      setQuantity(editItem.quantity);
      setCategory(editItem.category);
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const itemData = { name, expiryDate, price, quantity, category }; // Collect form data

     // Send a PUT request if editing an item or POST for a new item
    const response = editItem
      ? await fetch(`${apiUrl}/items/${editItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemData),
        })
      : await fetch(`${apiUrl}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemData),
        });

    const newItem = await response.json();
    onSubmit(newItem); // Pass updated/new item to parent component
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{editItem ? "Edit Item" : "Add Item"}</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Name:</label>
         <input
         type="text"
        value={name}
        onChange={(e) => {
         const value = e.target.value;
          // Allow only letters and spaces for the name field
         if (/^[a-zA-Z\s]*$/.test(value)) {
           setName(value);
         }
        }}
        required
         />
        </div>


          <div className="form-group">
        <label>Expiry Date:</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          min={today}  // Prevent selecting past dates
          required
        />
      </div>

          <div className="form-group">
          <label>Price (£):</label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          </div>

          <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          </div>

          <div className="form-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          </div>

          <button className="btn btn-success" type="submit">
            {editItem ? "Update" : "Add"} Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default FridgeForm;
