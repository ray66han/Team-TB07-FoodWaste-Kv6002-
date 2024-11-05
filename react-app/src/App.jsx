import React, { useState, useEffect } from "react";
import FridgeList from "./components/FridgeList";
import FridgeForm from "./components/FridgeForm";

function App() {
  const [items, setItems] = useState([]);

  // Fetch items from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error("Error fetching items:", error));
  }, []);

  return (
    <div>
      <h1>My Fridge System</h1>
      <FridgeList items={items} setItems={setItems} />
    </div>
  );
}

export default App;
