import React, { useState, useEffect } from 'react';

const Storage = ({ userEmail, darkMode }) => {
  const [files, setFiles] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const userId=sessionStorage.getItem('userId')

  useEffect(() => {
    const url = `http://127.0.0.1:5555/fileuser/${userId}`;
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
        calculateTotalSize(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [userId]);
  





  useEffect(() => {
    if (!userEmail) {
      console.error('User email not provided.');
      return;
    }
  
    const url = `http://127.0.0.1:5555/shares?shared_with_user_email=${encodeURIComponent(userEmail)}`;
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
        calculateTotalSize(data); // Calculate total size after fetching shared files
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  }, [userEmail]);
  
  
  
  const calculateTotalSize = (files) => {
    const total = files.reduce((acc, file) => acc + (file.size || file.file.size || 0), 0);
    setTotalSize(total);
  };
  



  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`rounded-xl  w-full h-full flex flex-col ${darkMode ? 'dark-mode3' : 'light-mode2'}`}>
      <div className='text-2xl mt-5 ml-9'>
        Storage
      </div>

      <div className='flex justify-between ml-10'>
        <div className='flex items-center justify-center'>
          <img src='/public/cloud.png' className='w-[80px] mt-4' alt='Storage icon' />
          <div className='flex-col font-mono mt-11 ml-5'>
            <h6 className='text-sm'>Total used</h6>
            <h3 className='text-3xl'>{formatSize(totalSize)}</h3>
          </div>
        </div>
      </div>

      <div className='flex overflow-y-auto flex-col w-full h-full ml-7 mt-2'>
        <div className='flex w-full items-center justify-between'>
        <h1 className='ml-[9px]'>Icon</h1>
          <h1 className='ml-[30px]'>Name</h1>
          <h1 className='ml-[280px]'>File type</h1>
          <h1 className='mr-[100px]'>Size</h1>
        </div>
        {files.map(file => (
           <div key={file.id || file.file_id} className='flex flex-col items-center'>
             <div className='flex p-2 w-full justify-between items-center'>
                <img src={file.path || file.file.path || '/src/assets/file.png'} className='w-[30px] rounded-full h-[30px]' alt={file.filename || file.file.filename} />
                <h1 className='ml-[30px]'>{file.filename || file.file.filename}</h1>
                <h1 className='ml-[80px]'>{file.file_type || "image"}</h1>
                <h1 className='mr-[70px]'>{formatSize(file.size || file.file.size)}</h1>
              </div>
            < div className='w-full mr-[140px] flex'><hr className='w-full' /></div>
            </div>
         ))}

      </div>
    </div>
  );
};

export default Storage;