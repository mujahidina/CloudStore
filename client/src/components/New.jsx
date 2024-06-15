import React, { useState } from 'react';
import { IoMdFolderOpen } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

const New = ({ darkMode, handleUpload, fileUrl}) => {
  const [addFolder, setAddFolder] = useState(false);
  const [input, setInput] = useState('');
  const [newFolder, setNewFolder] = useState(null);
  const userId = sessionStorage.getItem('userId');
  const [uploadedFile, setUploadedFile]=useState([])

  const toggleForm = () => {
    setAddFolder(!addFolder);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5555/files`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            path: fileUrl.thumbnail_url,
            filename: fileUrl.original_filename,
            file_type: fileUrl.resource_type,
            size: fileUrl.bytes,
            folder_id: '',
            user_id: userId,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update file');
        }
        return response.json();
    })
    .then(data => {
        setUploadedFile([...uploadedFile, data]); 
    })
    .catch(err => {
        console.error('Error uploading file:', err);
    });
};
  

  const handleInput = (e) => {
    setInput(e.target.value);
    e.preventDefault()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createFolder();
    // Toggle off the form after submitting
    toggleForm();
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

  
  return (
    <div>
     
      <div onChange={handleInput} className='flex cursor-pointer w-full items-center p-3' onClick={toggleForm}>
        <IoMdFolderOpen size={20} className='mr-4' /> Folder
      </div>
      <div>
        {addFolder ? <form onSubmit={handleSubmit} className={`flex border-2 rounded-lg  ${darkMode ? 'dark-mode3' : 'light-mode3'}  w-full h-[35px]`}>
          <input type='text' value={input} onChange={handleInput} placeholder='Folder  name' className={`w-full outline-none rounded-md ${darkMode ? 'dark-mode3' : 'light-mode3'} text-black p-2`} />
          <button type="submit"><MdCreateNewFolder size={25} className='mr-4 text-slate-900'/></button>
        </form> : ""}
      </div>
    
      
    </div>
  );
};

export default New;
