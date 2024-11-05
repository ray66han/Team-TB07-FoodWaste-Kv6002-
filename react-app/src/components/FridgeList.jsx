import React, { useEffect, useState } from "react";
import FridgeForm from "./FridgeForm";

const FridgeList = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleAddButtonClick = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const handleEditButtonClick = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item._id !== id));
  };

  const handleStatusChange = async (item) => {
    const updatedItem = { ...item, status: !item.status };
    await fetch(`http://localhost:5000/items/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
    setItems((prevItems) =>
      prevItems.map((i) => (i._id === item._id ? updatedItem : i))
    );
  };

  const handleFormSubmit = (newItem) => {
    setItems((prevItems) => {
      return editItem
        ? prevItems.map((item) => (item._id === newItem._id ? newItem : item))
        : [...prevItems, newItem];
    });
    setShowForm(false);
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
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{new Date(item.expiryDate).toLocaleDateString("en-CA")}</td>
              <td>£{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <input
                  type="checkbox"
                  checked={item.status}
                  onChange={() => handleStatusChange(item)}
                />
              </td>
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
