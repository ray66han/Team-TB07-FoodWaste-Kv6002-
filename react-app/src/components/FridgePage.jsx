import React from 'react';
import FridgeList from "./FridgeList";
import './styles/FridgePage.css'; 

const FridgePage = () => {
  return (
    <div className="fridge-page">
           <div className="fridge-content">
        <div className="fridge-table">
          <FridgeList />
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
        <h3>Personalized Tips</h3>
        <p>This is where the tips will be dynamically displayed</p>
      </div>
    </div>
  );
};

export default FridgePage;
