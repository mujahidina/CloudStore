import React, { useState, useEffect } from 'react';

const Starred = ({ userId, darkMode }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const url = `http://127.0.0.1:5555/starreditems/${userId}`;
    console.log('Fetch URL:', url);
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched files:', data);
        setFiles(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  }, [userId]);

  const handleUnstar = (fileId) => {
    fetch(`http://127.0.0.1:5555/starreditem/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to unstar file');
      }
      setFiles(files.filter((file) => file.file_id !== fileId));
    })
    .catch((error) => {
      console.error('Unstar error:', error.message);
    });
  };

  return (
    <div className={`container w-full h-full flex flex-col ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='text-2xl m-3'>
        Starred
      </div>
      <div className='flex overflow-y-auto flex-col w-full h-full ml-7 mt-5'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='ml-[80px]'>Name</h1>
          <h1 className='mr-[120px]'>Size</h1>
        </div>
        {files.map(file => (
          <div key={file.file_id} className='flex flex-col items-center'>
            <div className='flex p-2 w-full items-center'>
              <img src={file.file && file.file.path ? file.file.path : '/src/assets/file.png'} className='w-[30px] h-[30px]' alt={file.file && file.file.filename} />
              <h1 className='ml-[30px]'>{file.file && file.file.filename}</h1>
              <h1 className='ml-[80px]'>{file.file && file.file.size}</h1>
              <button onClick={() => handleUnstar(file.file_id)}>Unstar</button>
            </div>
            <div className='w-full mr-[140px] flex'><hr className='w-full' /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Starred;
