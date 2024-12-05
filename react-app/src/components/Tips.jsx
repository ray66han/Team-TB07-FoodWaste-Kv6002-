import React, { useState, useEffect } from "react";
import config from './config.json';

const Tips = ({ selectedCategory }) => {
  const apiUrl = config.API_URL;
  const [tips, setTips] = useState([]);

  useEffect(() => {
    // Fetch tips when a category is selected
    if (selectedCategory) {
      fetch(`${apiUrl}/tips/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setTips(data.tips)) // Update tips state with fetched data
        .catch((error) => console.error("Error fetching tips:", error));
    }
  }, [selectedCategory]); // Re-run this effect when the selected category changes

  return (
    <div>
      {/* Display the selected category */}
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
