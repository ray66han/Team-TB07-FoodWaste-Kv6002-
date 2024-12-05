import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import FridgePage from "./components/FridgePage";
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage"; 
import Notifications from "./components/Notifications"; 
import RegisterPage from "./components/RegisterPage"; 
import ForgotPasswordPage from "./components/ForgotPasswordPage"; 
import config from './components/config.json';


function App() {
  const apiUrl = config.API_URL;
  // State to store fridge items and settings dropdown visibility
  const [items, setItems] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  // Toggle the visibility of the settings dropdown
  const toggleSettingsDropdown = () => setShowSettings((prev) => !prev);

  // Fetch items from the API when the component mounts
  useEffect(() => {
    fetch(`${apiUrl}/items`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <Router>
      {/* Render the Navbar and pass the toggle function for settings */}
      <Navbar onSettingsToggle={toggleSettingsDropdown} />
      <SettingsPage show={showSettings} onClose={() => setShowSettings(false)} />
      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fridge" element={<FridgePage items={items} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
