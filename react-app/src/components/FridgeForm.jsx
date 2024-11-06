import React, { useState, useEffect } from "react";
import "./styles/FridgeForm.css";

const FridgeForm = ({ editItem, onClose, onSubmit }) => {
  const [name, setName] = useState(editItem ? editItem.name : "");
  const [expiryDate, setExpiryDate] = useState(editItem ? editItem.expiryDate : "");
  const [price, setPrice] = useState(editItem ? editItem.price : "");
  const [quantity, setQuantity] = useState(editItem ? editItem.quantity : "");
  const [category, setCategory] = useState(editItem ? editItem.category : "");

  // Predefined categories for selection
  const categories = ["Dairy", "Meat", "Vegetables", "Fruits", "Beverages", "Others"];

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setExpiryDate(editItem.expiryDate);
      setPrice(editItem.price);
      setQuantity(editItem.quantity);
      setCategory(editItem.category);
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { name, expiryDate, price, quantity, category };

    const response = editItem
      ? await fetch(`http://localhost:5000/items/${editItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemData),
        })
      : await fetch("http://localhost:5000/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemData),
        });

    const newItem = await response.json();
    onSubmit(newItem);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{editItem ? "Edit Item" : "Add Item"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Expiry Date:</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />

          <label>Price (£):</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

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

          <button className="btn btn-success" type="submit">
            {editItem ? "Update" : "Add"} Item
          </button>
          <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default FridgeForm;
