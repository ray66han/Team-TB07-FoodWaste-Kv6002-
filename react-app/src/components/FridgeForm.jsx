import React, { useState, useEffect } from "react";

const FridgeForm = ({ editItem, onClose, onSubmit }) => {
  const [name, setName] = useState(editItem ? editItem.name : "");
  const [expiryDate, setExpiryDate] = useState(editItem ? editItem.expiryDate : "");
  const [price, setPrice] = useState(editItem ? editItem.price : "");
  const [quantity, setQuantity] = useState(editItem ? editItem.quantity : "");

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setExpiryDate(editItem.expiryDate);
      setPrice(editItem.price);
      setQuantity(editItem.quantity);
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { name, expiryDate, price, quantity };

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

        <button type="submit">{editItem ? "Update" : "Add"} Item</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default FridgeForm;
