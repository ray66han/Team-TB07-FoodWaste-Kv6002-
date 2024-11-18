import React, { useEffect, useState } from "react";
import FridgeForm from "./FridgeForm";
import "./styles/FridgeList.css";
import EditIcon from "../assets/icons/editing.png";
import DeleteIcon from "../assets/icons/delete.png";


const FridgeList = ({ onItemSelected, onStatusChange }) => {
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
        fetchItems();
        onStatusChange();
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

  const currentDate = new Date();

  return (
    <div>
      <div className="fridge-header">
        <h2>Fridge</h2>
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
            <input
              type="checkbox"
              checked={item.status === true}
              onChange={() => handleStatusChange(item._id, item.status)}
              disabled={isExpired}
            />
          </td>
          <td>
          <button onClick={() => handleEditButtonClick(item)} disabled={isExpired}  className="edit-button">
           <img src={EditIcon} alt="Edit" style={{ width: "20px", height: "20px" }} />
          </button>
         </td>
          <td>
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
