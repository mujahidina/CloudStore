import React, { useState, useEffect } from 'react';
import './Shared.css'; // Import the CSS file for styling

const Shared = () => {
  // State to store shared items fetched from the backend
  const [sharedItems, setSharedItems] = useState([]);

  // Function to fetch shared items from the backend
  const fetchSharedItems = async () => {
    try {
      const response = await fetch('/api/shared'); // Adjust the API endpoint URL
      if (!response.ok) {
        throw new Error('Failed to fetch shared items');
      }
      const data = await response.json();
      setSharedItems(data);
    } catch (error) {
      console.error('Error fetching shared items:', error);
    }
  };

  // Fetch shared items on component mount
  useEffect(() => {
    fetchSharedItems();
  }, []);

  return (
    <div className="shared-container">
      <div className="title">
        <h2>Shared with me</h2>
      </div>
      <div className="toolbar">
        <div className="filter-bar">
          <label>Filter by:</label>
          <select>
            <option value="all">No filters applied</option>
            {/* Add filter options here if needed */}
          </select>
        </div>
        <div className="sort-bar">
          <label>Sort by:</label>
          <select>
            <option value="name">Name</option>
            <option value="owner">Shared by</option>
            <option value="sharedDate">Share date</option>
          </select>
        </div>
      </div>
      <div className="shared-list">
        {sharedItems.map((item, index) => (
          <div key={index} className="shared-item">
            <div>{item.name}</div>
            <div>{item.owner}</div>
            <div>{item.type}</div>
            <div>{item.sharedDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shared;