import React, { useEffect, useState } from "react";
import FridgeForm from "./FridgeForm";
import "./styles/FridgeList.css";
import EditIcon from "../assets/icons/editing.png";
import DeleteIcon from "../assets/icons/delete.png";
import config from './config.json';

// Component for displaying and managing the list of fridge items
const FridgeList = ({ onItemSelected, onStatusChange }) => {
  const apiUrl = config.API_URL;
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false); // Display the form
  const [editItem, setEditItem] = useState(null); // Item to edit
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Delete items
  const [deleteItemId, setDeleteItemId] = useState(null); // ID of the item to delete

  const fetchItems = () => {
    fetch(`${apiUrl}/items`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Open the form for adding a new item
  const handleAddButtonClick = () => {
    setEditItem(null);
    setShowForm(true);
  };

  // Open the form for editing an existing item
  const handleEditButtonClick = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

   // Handle the delete button click
  const handleDeleteClick = (item) => {
    setDeleteItemId(item._id);  // Remove the item from state
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    await fetch(`${apiUrl}/items/${deleteItemId}`, { method: "DELETE" });
    setItems(items.filter((item) => item._id !== deleteItemId));
    setShowDeleteConfirm(false);
  };

   // Toggle the status (used/wasted) of an item
  const handleStatusChange = async (itemId, currentStatus) => {
    try {
      const response = await fetch(`${apiUrl}/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !currentStatus }),
      });

      if (response.ok) {
        fetchItems(); // Refresh the list after status update
        onStatusChange();
      } else {
        console.error("Failed to update item status on the server");
      }
    } catch (error) {
      console.error("Failed to update item status:", error);
    }
  };

  // Handle item selection for displaying tips
  const handleSelectItem = (item) => {
    onItemSelected(item.category);
  };

  // Update state when the form is submitted
  const handleFormSubmit = (submittedItem) => {
    setItems((prevItems) => {
      if (editItem) {
        // Update existing item in state
        return prevItems.map((item) =>
          item._id === submittedItem._id ? submittedItem : item
        );
      } else {
        // Add new item to state
        return [...prevItems, submittedItem];
      }
    });
    setShowForm(false);
  };

  const currentDate = new Date();

  return (
    <div>
      <div className="fridge-header">
        <h2>Fridge</h2>
        {/* Button to open form for adding an item */}
        <button className="add-item-btn" onClick={handleAddButtonClick}>
          Add Item +
        </button>
      </div>

      {showForm && (
        <FridgeForm
          editItem={editItem}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {/* Render delete confirmation if toggled */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <button className="btn btn-danger" onClick={confirmDelete}>
              Yes
            </button>
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

 {/* Table displaying fridge items */}
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Expiry Date</th>
      <th>Price (£)</th>
      <th>Quantity</th>
      <th>Used/Wasted</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item) => {
      const isExpired = new Date(item.expiryDate) < new Date();

      return (
        <tr
          key={item._id}
          className={isExpired ? "expired-item" : ""}
          onClick={() => !isExpired && handleSelectItem(item)}
        >
          <td>{item.name}</td>
          <td>{new Date(item.expiryDate).toLocaleDateString("en-CA")}</td>
          <td>£{item.price}</td>
          <td>{item.quantity}</td>
          <td>
             {/* Checkbox for toggling item status */}
          <label className={`custom-checkbox ${isExpired ? "disabled" : ""}`}>
            <input
              type="checkbox"
              checked={item.status === true}
              onChange={() => handleStatusChange(item._id, item.status)}
              disabled={isExpired}
            />
            </label>
          </td>
          <td>
            {/* Edit button */}
          <button onClick={() => handleEditButtonClick(item)} disabled={isExpired}  className="edit-button">
           <img src={EditIcon} alt="Edit" style={{ width: "20px", height: "20px" }} />
          </button>
         </td>
          <td>
             {/* Delete button */}
          <button onClick={() => handleDeleteClick(item)} className="delete-button">
           <img src={DeleteIcon} alt="Delete" style={{ width: "20px", height: "20px" }} />
          </button>
        </td>
        </tr>
      );
    })}
  </tbody>
</table>
    </div>
  );
};

export default FridgeList;
