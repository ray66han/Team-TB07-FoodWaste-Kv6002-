import React, { useState } from 'react';
import FridgeList from "./FridgeList";
import Tips from "./Tips";
import Savings from "./Savings";
import './styles/FridgePage.css';

const FridgePage = () => {
  // State to track the selected category for displaying tips
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleItemSelected = (category) => {
    setSelectedCategory(category); // Update the selected category
  };

  const toggleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return (
    <div className="fridge-page">
      <div className="fridge-content">
        <div className="fridge-table">
          <FridgeList onItemSelected={handleItemSelected} onStatusChange={toggleRefresh}/>
        </div>
        <div className="side-info">
          <Savings refresh={refresh}/> {/* Refresh stats when status changes */}
        </div>
      </div>
      <div className="tips-section">
        <Tips selectedCategory={selectedCategory} /> {/* Show category-specific tips */}
      </div>
    </div>
  );
};

export default FridgePage;
