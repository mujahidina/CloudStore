import React, { useState, useEffect } from 'react';

const Shared = ({ userEmail, darkMode }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {

    const url = `http://127.0.0.1:5555/shares/${userEmail}`;
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
  }, [userEmail]);

  return (
    <div className={`container w-full h-full flex flex-col ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='text-2xl m-3'>
        Shared with me
      </div>
      <div className='flex overflow-y-auto flex-col w-full h-full ml-7 mt-5'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='ml-[80px]'>Name</h1>
          <h1 className='mr-[120px]'>Size</h1>
          <h1 className='mr-[120px]'>Shared by</h1>
        </div>
        {files.map(file => (
          <div key={file.file_id} className='flex flex-col items-center'>
            <div className='flex p-2 w-full items-center'>
              <img src={file.file.path || '/src/assets/file.png'} className='w-[30px] h-[30px]' alt={file.file.filename} />
              <h1 className='ml-[30px]'>{file.file.filename}</h1>
              <h1 className='ml-[80px]'>{file.file.size}</h1>
              <h1 className='ml-[80px]'>{file.user.email}</h1>
            </div>
            <div className='w-full mr-[140px] flex'><hr className='w-full' /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shared;












