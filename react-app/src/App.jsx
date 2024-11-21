import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import FridgePage from "./components/FridgePage";
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage"; 
import Notifications from "./components/Notifications"; 
import RegisterPage from "./components/RegisterPage"; 


function App() {
  const [items, setItems] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettingsDropdown = () => setShowSettings((prev) => !prev);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <Router>
      <Navbar onSettingsToggle={toggleSettingsDropdown} />
      <SettingsPage show={showSettings} onClose={() => setShowSettings(false)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fridge" element={<FridgePage items={items} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
