import React, { useEffect, useState } from "react";
import FridgeForm from "./FridgeForm";
import "./styles/FridgeList.css";

const FridgeList = ({ onItemSelected }) => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const fetchItems = () => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  };

 
  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddButtonClick = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const handleEditButtonClick = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    await fetch(`http://localhost:5000/items/${deleteItemId}`, { method: "DELETE" });
    setItems(items.filter((item) => item._id !== deleteItemId));
    setShowDeleteConfirm(false);
  };

const handleStatusChange = async (itemId, currentStatus) => {
  try {
    const response = await fetch(`http://localhost:5000/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: !currentStatus }),
    });

    if (response.ok) {
      // Refetch items to ensure status is updated
      fetchItems();
    } else {
      console.error("Failed to update item status on the server");
    }
  } catch (error) {
    console.error("Failed to update item status:", error);
  }
};


  const handleSelectItem = (item) => {
    onItemSelected(item.category);  
  };  

  const handleFormSubmit = (submittedItem) => {
    setItems((prevItems) => {
      if (editItem) {
        return prevItems.map((item) =>
          item._id === submittedItem._id ? submittedItem : item
        );
      } else {
        return [...prevItems, submittedItem];
      }
    });
    setShowForm(false);
  };

  return (
    <div>
      <div className="fridge-header">
        <h2>Fridge</h2>
        <button className="add-item-btn" onClick={handleAddButtonClick}>Add Item +</button>
      </div>

      {showForm && (
        <FridgeForm
          editItem={editItem}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <button className="btn btn-danger" onClick={confirmDelete}>Yes</button>
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Expiry Date</th>
            <th>Price (£)</th>
            <th>Quantity</th>
            <th>Used/Wasted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} onClick={() => handleSelectItem(item)}>
              <td>{item.name}</td>
              <td>{new Date(item.expiryDate).toLocaleDateString("en-CA")}</td>
              <td>£{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <input
                  type="checkbox"
                  checked={item.status === true}
                  onChange={() => handleStatusChange(item._id, item.status)}
                />
              </td>
              <td>
                <button onClick={() => handleEditButtonClick(item)}>Edit</button>
                <button onClick={() => handleDeleteClick(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FridgeList;
