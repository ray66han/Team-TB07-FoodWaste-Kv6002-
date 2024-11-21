import React, { useEffect, useState } from 'react';
import "./styles/Savings.css";

const Savings = ({ refresh }) => {
  const [stats, setStats] = useState({
    savedMoney: 0,
    wastedMoney: 0,
    itemsSaved: 0,
    itemsWasted: 0,
    soonToExpire: 0,
  });

  useEffect(() => {
    // console.log("Fetching savings stats due to refresh change:", refresh);
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/savings-stats");
        if (!response.ok) throw new Error("Network response for Savings.jsx was not ok");
        const data = await response.json();
        // console.log("Fetched savings stats:", data);
        if (data && typeof data.savedMoney === 'number' && typeof data.wastedMoney === 'number') {
          setStats(data);
        } else {
          console.warn("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching savings stats:", error);
      }
    };

    fetchStats();
  }, [refresh]);

  return (
    <div className="savings-container">
      <div className="saved-info">
        <h3>Saved</h3>
        <p>Monthly saved money: £{(stats.savedMoney ?? 0).toFixed(2)}</p>
        <p>Items saved: {stats.itemsSaved}</p>
        <p>Soon-to-Expire: {stats.soonToExpire}</p>
      </div>
      <div className="wasted-info">
        <h3>Wasted</h3>
        <p>Monthly wasted money: £{(stats.wastedMoney ?? 0).toFixed(2)}</p>
        <p>Items wasted: {stats.itemsWasted}</p>
      </div>
    </div>
  );
};

export default Savings;