import React, { useState, useEffect } from 'react';

const TrashBin = () => {
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        // Simulate fetching trash bin status from the backend
        const fetchTrashBinStatus = async () => {
            try {
               
                const response = await fetch('/api/trash_bin_status');
                const data = await response.json();
                setIsEmpty(data.isEmpty);
            } catch (error) {
                console.error('Error fetching trash bin status:', error);
            }
        };

        fetchTrashBinStatus();
    }, []);

    return (
        <div className="trash-bin">
            
            <img src={isEmpty ? "https://static.vecteezy.com/system/resources/thumbnails/004/264/039/small/rubbish-trash-recycle-bin-icon-set-free-vector.jpg" : ""} alt="Trash Bin" />
           
            <br />
            
            {isEmpty && <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>OPPS NOTHING TO SEE HERE!!</p>}
        </div>
    );
};

export default TrashBin;
