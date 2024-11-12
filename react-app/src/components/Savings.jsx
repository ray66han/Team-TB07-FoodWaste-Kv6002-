import React, { useEffect, useState } from 'react';

const Savings = () => {
  const [stats, setStats] = useState({
    savedMoney: 0,
    wastedMoney: 0,
    itemsWasted: 0,
    soonToExpire: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/savings-stats");
        if (!response.ok) throw new Error("Network response for Savings.jsx was not ok");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching savings stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="savings-container">
      <div className="saved-info">
        <h3>Saved</h3>
        <p>Monthly saved money: £{(stats.savedMoney ?? 0).toFixed(2)}</p>
        <p>Items wasted: {stats.itemsWasted}</p>
        <p>Soon-to-Expire: {stats.soonToExpire}</p>
      </div>
      <div className="wasted-info">
        <h3>Wasted</h3>
        <p>Monthly wasted money: £{(stats.wastedMoney ?? 0).toFixed(2)}</p>
        <p>Items wasted: {stats.itemsWasted}</p>
        <p>Soon-to-Expire: {stats.soonToExpire}</p>
      </div>
    </div>
  );
};

export default Savings;
