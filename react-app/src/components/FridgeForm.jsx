import React, { useState } from "react";

const FridgeForm = ({ editItem, onClose, onSubmit }) => {
  const [name, setName] = useState(editItem?.name || "");  // Ensure default value is an empty string
  const [expiryDate, setExpiryDate] = useState(editItem?.expiryDate || ""); // Default to empty string
  const [price, setPrice] = useState(editItem?.price || ""); // Default to empty string
  const [quantity, setQuantity] = useState(editItem?.quantity || ""); // Default to empty string
  const [status, setStatus] = useState(editItem?.status || false); // Default to false for checkbox

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { name, expiryDate, price, quantity, status };

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

    // Reset the form after submission
    setName("");
    setExpiryDate("");
    setPrice("");
    setQuantity("");
    setStatus(false);

    // Close the form modal
    onClose();
  };

  return (
    <div className="modal">
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

        <label>Status:</label>
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />

        <button type="submit">{editItem ? "Update" : "Add"} Item</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default FridgeForm;
