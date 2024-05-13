import React, { useState, useEffect } from 'react';
import './Recent.css';

const Recent = () => {
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await fetch('/api/recent'); // Replace '/api/recent' with your backend API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch recent items');
        }
        const data = await response.json();
        setRecentItems(data);
      } catch (error) {
        console.error('Error fetching recent items:', error);
      }
    };

    fetchRecentItems();
  }, []);

  return (
    <div className="recent-container">
      <h2>Recent</h2>
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
            <option value="owner">Owner</option>
            <option value="modified">Modified</option>
            <option value="fileSize">File size</option>
          </select>
        </div>
      </div>
      <div className="recent-list">
        {recentItems.map((item, index) => (
          <div key={index} className="recent-item">
            <div>{item.name}</div>
            <div>{item.owner}</div>
            <div>{item.modified}</div>
            <div>{item.fileSize}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;