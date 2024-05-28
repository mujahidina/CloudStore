import React, { useEffect, useState } from 'react';
import { MdFolderOpen } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaRegFileAlt } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { TiFolderOpen } from "react-icons/ti";
import { SlOptionsVertical } from "react-icons/sl";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaRegTrashAlt, FaRegStar, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiShare2 } from "react-icons/ci";

const Home = ({ darkMode, toggleMode, handleUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState(true);
  const [selectedFolders, setSelectedFolders] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [flexView, setFlexView] = useState(true);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [options, setOptions] = useState(false);
  const [fileOptions, setFileOptions] = useState(false);

  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const userId = sessionStorage.getItem('userId');

  const [hasItems, setHasItems] = useState(false);

  // State variables for managing the share input field
  const [showShareInput, setShowShareInput] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  // Function to toggle visibility of the share input field
  const toggleShareInput = () => {
    setShowShareInput(!showShareInput);
  };

  // Function to handle changes in the email address input
  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value);
  };

  // Function to share a file
  const handleShare = (fileId) => {
    // Ensure the payload has the correct structure
    const payload = {
      file_id: fileId, 
      share_type: 'read', 
      user_id: userId,
      shared_with_user_email: emailAddress,
    };
  
    console.log('Payload:', payload);
  
    fetch(`http://127.0.0.1:5555/shares`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Sharing file with email address:', emailAddress);
        setEmailAddress('');
        setShowShareInput(false);
        console.log('File shared successfully:', data);
      })
      .catch(error => {
        console.error('Error sharing file:', error);
      });
  };

  // Function to toggle file options
  const toggleFileOptions = (fileId) => {
    setFileOptions(!fileOptions);
    setSelectedFileId(fileId);
  };

  const toggleMessage = () => {
    setHasItems(!hasItems);
  };

  // States for editing
  const [editFolder, setEditFolder] = useState('');
  const [editFolderId, setEditFolderId] = useState(null);
  const [editFileId, setEditFileId] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);

  // Handling trash items
  const handleMoveToTrash = (itemId) => {
    fetch(`http://127.0.0.1:5555/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        file_id: itemId, // Update fileId
        item_type: '', // Update item_type if necessary
        user_id: userId
      })
    })
      .then(response => response.json())
      .then(data => {
        // Remove the file from the files state
        setFiles(prevFiles => prevFiles.filter(file => file.id !== itemId));
  
        // Update UI to reflect changes, for example, remove the item from the view
        setFolders(prevFolders => prevFolders.filter(folder => folder.id !== itemId));
        console.log('Item moved to trash:', data);
      })
      .catch(error => {
        console.error('Error moving item to trash:', error);
      });
  };


  const handleStarFile = (fileId) => {
    const payload = {
      file_id: fileId,
      item_type: 'file',
      user_id: userId,
    };
  
    console.log('Starring file with payload:', payload);
  
    fetch(`http://127.0.0.1:5555/starreditems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('File starred successfully:', data);
      })
      .catch(error => {
        console.error('Error starring file:', error.message);
      });
  };
  
  

  useEffect(() => {
    // Fetch folders
    fetch(`http://127.0.0.1:5555/foldersuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFolders(data);
      });

    // Fetch files
    fetch(`http://127.0.0.1:5555/fileuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      });
  }, [userId]);

  // Edit folder
  const handleEditClick = (id, currentName) => {
    setEditFolderId(id);
    setEditFolder(currentName);
  };

  const handleInputChange = (e) => {
    setEditFolder(e.target.value);
  };

  const handleSaveClick = (id) => {
    fetch(`http://127.0.0.1:5555/filefolder/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ folder_name: editFolder })
    })
      .then(response => response.json())
      .then(data => {
        setFolders(prevFolders => prevFolders.map(folder =>
          folder.id === id ? data : folder
        ));
        console.log('Folder updated:', data);
      })
      .catch(error => {
        console.error('Error updating folder:', error);
      });

    setEditFolderId(null);
    setEditFolder('');
  };

  const handleCancelClick = () => {
    setEditFolderId(null);
    setEditFolder('');
  };

  const handleToggleFiles = () => {
    setSelectedFiles(true);
    setSelectedFolders(false);
  };

  const handleToggleFolders = () => {
    setSelectedFiles(false);
    setSelectedFolders(true);
  };

  const handleToggleGrid = () => {
    setGridView(prevMode => !prevMode);
    setFlexView(false);
  };

  const handleToggleFlex = () => {
    setFlexView(prevMode => !prevMode);
    setGridView(false);
  };

  const toggleOptions = (folderId) => {
    setOptions(!options);
    setSelectedFolderId(folderId);
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <div>
        <div className='flex w-full mt-5 items-center ml-7'><h1 className='text-xl'>Welcome to CloudStore</h1></div>
        <div className='flex w-full mt-5 justify-between items-center ml-9'>
          <h1>My Items</h1>
          <div className={`flex w-[200px] mr-[300px] ${darkMode ? 'dark-mode3' : 'light-mode3'} p-1 items-center rounded-full`}>
            <div onClick={handleToggleFiles} className='ml-1 flex items-center w-full border-r border-black'>
              {selectedFiles ? <TiTick /> : <FaRegFileAlt size={15} className='mr-2' />}<button>Files</button>
            </div>
            <div onClick={handleToggleFolders} className='ml-5 flex items-center w-full mr-2'>
              {selectedFolders ? <TiTick />
                          : <MdFolderOpen size={20} className='mr-2' />}Folders
                          </div>
                        </div>
                        <div className={`flex w-[100px] mr-[80px] ${darkMode ? 'dark-mode3' : 'light-mode3'} border p-1 items-center rounded-full`}>
                          <div onClick={handleToggleFlex} className='ml-1 flex items-center w-full border-r border-black'>
                            {flexView ? <TiTick /> : ''}<FaBars size={20} />
                          </div>
                          <div onClick={handleToggleGrid} className='justify-center flex items-center w-full mr-2'>
                            {gridView ? <TiTick /> : ''}<IoGridOutline size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
              
                    {selectedFolders ? gridView ?
                      <div className='grid overflow-y-auto ml-9 mr-9 gap-x-5 grid-cols-3 w-[940px] gap-y-8 mt-5'>
                        {folders.map(folder => (
                          <div key={folder.id} className={`flex w-full h-[50px] justify-between rounded-xl  items-center ${darkMode ? 'dark-mode3' : 'light-mode3'} cursor-pointer`}>
                            <TiFolderOpen size={20} className='mr-5 ml-5' />
                            {editFolderId === folder.id ? (
                              <div className='flex w-full '>
                                <input
                                  type="text"
                                  value={editFolder}
                                  onChange={handleInputChange}
                                  className={`w-full h-[40px] rounded-lg pl-2 ${darkMode ? 'dark-mode' : 'light-mode'}`}
                                />
                                <button onClick={() => handleSaveClick(folder.id)} className={`ml-2 p-1 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}>Save</button>
                                <button onClick={handleCancelClick} className={`ml-2 p-1 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}>Cancel</button>
                              </div>
                            ) : (
                              <Link
                                to={`/folders/${folder.id}`}
                                className='w-full flex items-center'
                              >
                                {folder.folder_name}
                              </Link>
                            )}
                            <div className='relative'>
                              <SlOptionsVertical onClick={() => toggleOptions(folder.id)} className='mr-5' />
                              {options && selectedFolderId === folder.id && (
                                <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg'>
                                  <ul>
                                    <li onClick={() => handleEditClick(folder.id, folder.folder_name)} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Rename <MdOutlineDriveFileRenameOutline size={15} /></li>
                                    <li onClick={() => handleMoveToTrash(folder.id)} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Trash <FaRegTrashAlt size={15} /></li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      : flexView ?
                        <div className='grid overflow-y-auto ml-9 mr-9 gap-x-5 grid-cols-1 w-[940px] gap-y-8 mt-5'>
                          {folders.map(folder => (
                            <div key={folder.id} className={`flex w-full h-[50px] justify-between rounded-xl  items-center ${darkMode ? 'dark-mode3' : 'light-mode3'} cursor-pointer`}>
                              <TiFolderOpen size={20} className='mr-5 ml-5' />
                              {editFolderId === folder.id ? (
                                <div className='flex w-full '>
                                  <input
                                    type="text"
                                    value={editFolder}
                                    onChange={handleInputChange}
                                    className={`w-full h-[40px] rounded-lg pl-2 ${darkMode ? 'dark-mode' : 'light-mode'}`}
                                  />
                                  <button onClick={() => handleSaveClick(folder.id)} className={`ml-2 p-1 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}>Save</button>
                                  <button onClick={handleCancelClick} className={`ml-2 p-1 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}>Cancel</button>
                                </div>
                              ) : (
                                
                                <Link
                                  to={`/folders/${folder.id}`}
                                  className='w-full flex items-center'
                                >
                                  {folder.folder_name}
                                </Link>
                              )}
                              <div className='relative'>
                                <SlOptionsVertical onClick={() => toggleOptions(folder.id)} className='mr-5' />
                                {options && selectedFolderId === folder.id && (
                                  <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg'>
                                    <ul>
                                      <li onClick={() => handleEditClick(folder.id, folder.folder_name)} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Rename <MdOutlineDriveFileRenameOutline size={15} /></li>
                                      <li onClick={() => handleMoveToTrash(folder.id)} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Trash <FaRegTrashAlt size={15} /></li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        : ''
                      : gridView ?
                        <div className='grid overflow-y-auto ml-9 mr-9 gap-x-5 grid-cols-3 w-[940px] gap-y-8 mt-5'>
                          {files.map(file => (
                            <div key={file.id} className={`flex w-full h-[50px] justify-between rounded-xl items-center ${darkMode ? 'dark-mode3' : 'light-mode3'} cursor-pointer`}>
                              <FaRegFileAlt size={20} className='mr-5 ml-5' />
                              <div className='w-full flex items-center justify-between'>
                                <Link to={`/files/${file.id}`} className='w-full flex items-center'>
                                  {file.file_name}
                                </Link>
                                <div className='flex items-center'>
                                  <div className='relative'>
                                    <SlOptionsVertical onClick={() => toggleFileOptions(file.id)} className='mr-5' />
                                    {fileOptions && selectedFileId === file.id && (
                                      <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg'>
                                        <ul>
                                          <li onClick={() => handleMoveToTrash(file.id)} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Trash <FaRegTrashAlt size={15} /></li>
                                          <li className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Star <FaRegStar size={15} /></li>
                                          {/* <li className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Unstar <FaStar size={15} /></li> */}
                                          <button onClick={() => handleStarFile(file.id)} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>
                    Star <FaRegStar size={15} />
                  </button>
                                          <li onClick={toggleShareInput} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Share <CiShare2 size={15} /></li>
                                          {showShareInput && (
                                            <div className='p-2'>
                                              <input
                                                type="text"
                                                value={emailAddress}
                                                onChange={handleEmailChange}
                                                placeholder="Enter email"
                                                className={`w-full p-2 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}
                                              />
                                              <button onClick={() => handleShare(file.id)} className={`w-full p-2 mt-2 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}>Share</button>
                                            </div>
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        : flexView ?
                          <div className='grid overflow-y-auto ml-9 mr-9 gap-x-5 grid-cols-1 w-[940px] gap-y-8 mt-5'>
                            {files.map(file => (
                              <div key={file.id} className={`flex w-full h-[50px] justify-between rounded-xl items-center ${darkMode ? 'dark-mode3' : 'light-mode3'} cursor-pointer`}>
                                <FaRegFileAlt size={20} className='mr-5 ml-5' />
                                <div className='w-full flex items-center justify-between'>
                                  <Link to={`/files/${file.id}`} className='w-full flex items-center'>
                                    {file.file_name}
                                  </Link>
                                  <div className='flex items-center'>
                                    <div className='relative'>
                                      <SlOptionsVertical onClick={() => toggleFileOptions(file.id)} className='mr-5' />
                                      {fileOptions && selectedFileId === file.id && (
                                        <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg'>
                                          <ul>
                                            <li onClick={() => handleMoveToTrash(file.id)} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Trash <FaRegTrashAlt size={15} /></li>
                                            {/* <li className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Star <FaRegStar size={15} /></li> */}
                                            <button onClick={() => handleStarFile(file.id)} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>
                    Star <FaRegStar size={15} />
                  </button>
                                            {/* <li className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Unstar <FaStar size={15} /></li> */}
                                            <li onClick={toggleShareInput} className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Share <CiShare2 size={15} /></li>
                                            {showShareInput && (
                                              <div className='p-2'>
                                                <input
                                                  type="text"
                                                  value={emailAddress}
                                                  onChange={handleEmailChange}
                                                  placeholder="Enter email"
                                                  className={`w-full p-2 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}
                                                />
                                                <button onClick={() => handleShare(file.id)} className={`w-full p-2 mt-2 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}>Share</button>
                                              </div>
                                            )}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          : ''
                    }
                  </div>
  );
};

export default Home;