import React, { useState, useEffect } from "react";

const Tips = ({ selectedCategory }) => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:5000/tips/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setTips(data.tips))
        .catch((error) => console.error("Error fetching tips:", error));
    }
  }, [selectedCategory]);

  return (
    <div>
      <h3>Tips for {selectedCategory}</h3>
      <ul>
        {tips.length > 0 ? (
          tips.map((tip, index) => <li key={index}>{tip}</li>)
        ) : (
          <p>Select an item to see tips.</p>
        )}
      </ul>
    </div>
  );
};

export default Tips;
