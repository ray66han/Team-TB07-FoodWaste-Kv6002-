import React, { useState } from 'react';
import FridgeList from "./FridgeList";
import Tips from "./Tips";
import './styles/FridgePage.css';

const FridgePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleItemSelected = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="fridge-page">
      <div className="fridge-content">
        <div className="fridge-table">
          <FridgeList onItemSelected={handleItemSelected} />
        </div>
        <div className="side-info">
          <div className="saved-info">
            <h3>Saved</h3>
            <p>Monthly wasted money: £3.20</p>
            <p>Items wasted: 2</p>
            <p>Soon-to-Expire: 4</p>
          </div>
          <div className="wasted-info">
            <h3>Wasted</h3>
            <p>Monthly wasted money: £3.40</p>
            <p>Items wasted: 2</p>
            <p>Soon-to-Expire: 4</p>
          </div>
        </div>
      </div>
      <div className="tips-section">
        <Tips selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default FridgePage;
