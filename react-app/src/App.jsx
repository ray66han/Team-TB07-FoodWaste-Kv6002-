import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from "./components/HomePage";
import FridgePage from './components/FridgePage';
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage";

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
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/fridge" element={<FridgePage items={items}/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  </Router>
  );
}

export default App;
