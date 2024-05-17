import React, { useState, useEffect } from 'react';

const Recent = () => {
  //  store recent items
  const [recentItems, setRecentItems] = useState([]);

  // fetch recent items from the cloud store
  const fetchRecentItems = async () => {
    try {
      // Make a GET request to fetch recent items from the cloud store API
      const response = await fetch('https://api.cloudstore.com/recent');
      
      // Check if the request was successful 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

     
      const data = await response.json();

      // Set the recent items state with the data from the response
      setRecentItems(data);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem fetching recent items:', error);
    }
  };

  // useEffect hook to fetch recent items when the component mounts
  useEffect(() => {
    fetchRecentItems();
  }, []);

  return (
    <div>
      <h2>Recent Items</h2>
      <ul>
        {recentItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recent;