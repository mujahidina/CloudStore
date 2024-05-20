import React, { useState } from 'react';
import { IoMdFolderOpen } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

const New = ({ darkMode, handleUpload }) => {
  const [addFolder, setAddFolder] = useState(false);
  const [input, setInput] = useState('');
  const [newFolder, setNewFolder] = useState(null);
  const userId = sessionStorage.getItem('userId');
  const [newFile, setNewFile] = useState(null);

  const toggleForm = () => {
    setAddFolder(!addFolder);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createFolder();
  };

  const createFolder = () => {
    if (!userId) {
      console.error("User ID is not provided.");
      return;
    }

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        folder_name: input,
        user_id: userId
      })
    };

    fetch(`http://127.0.0.1:5555/folders`, opts)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create folder');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setNewFolder(data);
      })
      .catch(error => {
        console.error('Error creating folder:', error);
      });
  };

  const thenUpload = (fileInfo) => {
    const fileUrl = fileInfo.secure_url;
    setNewFile(fileUrl);
    sendFileToBackend(fileInfo);
  };

  const sendFileToBackend = (fileInfo) => {
    fetch('http://127.0.0.1:5555/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: fileInfo.secure_url,
        public_id: fileInfo.public_id,
        user_id: userId 
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Item submitted', data);
    })
    .catch(error => {
      console.error('Error submitting file', error);
    });
  };

  return (
    <div>
      <div className='flex cursor-pointer w-full items-center p-3' onClick={toggleForm}>
        <IoMdFolderOpen size={20} className='mr-4' /> Folder
      </div>
      <div>
        {addFolder ? <form onSubmit={handleSubmit} className={`flex border-2 rounded-lg  ${darkMode ? 'dark-mode3' : 'light-mode3'}  w-full h-[35px]`}>
          <input type='text' value={input} onChange={handleInput} placeholder='Folder  name' className={`w-full outline-none rounded-md ${darkMode ? 'dark-mode3' : 'light-mode3'} text-black p-2`} />
          <button type="submit"><MdCreateNewFolder size={25} className='mr-4 text-slate-900'/></button>
        </form> : ""}
      </div>
      <div className='flex cursor-pointer w-full items-center p-3'>
        <FaFileAlt size={20} className='mr-4 '/>
        <button onClick={handleUpload}>File upload</button>
      </div>
      <div className='flex cursor-pointer w-full items-center p-3'>
        <IoMdFolderOpen size={20} className='mr-4' />
        <button onClick={handleUpload}>Folder upload</button>
      </div>
    </div>
  );
};

export default New;
