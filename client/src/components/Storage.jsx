import React, { useState, useEffect } from 'react';
import { TiFolderOpen } from 'react-icons/ti';

const Storage = ({ userId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/fileuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      });
  }, [userId]);

  return (
    <div className='bg-white container w-full h-full flex flex-col font-sans'>
      <div className='text-2xl m-3'>
        Storage
      </div>

      <div className='w-72 h-36 m-3'> 
        <div className='flex'>
          <img src='/src/assets/storage.png' className='w-16 mt-9' alt='Storage icon' />
          <div className='flex-col font-mono mt-11 ml-5'> 
            <h6 className='text-sm'>Total used</h6>
            <h3 className='text-3xl'>20.2MB</h3>
          </div>
        </div>
      </div>

      <div className='grid overflow-y-auto grid-cols-3 w-full ml-7'>
        {files.map(file => (
          <div key={file.id} className='flex items-center'>
            <TiFolderOpen size={20} className='mr-5' />
            <h1>{file.filename}</h1>
          </div>
        ))}
      </div>
      </div>
  );
}

export default Storage;
