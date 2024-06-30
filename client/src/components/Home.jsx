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
  const[isLoaded, setIsLoaded]=useState(false)
  const [emailAddress, setEmailAddress] = useState('');
  const [showShareInput, setShowShareInput] = useState(false);

  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const userId = sessionStorage.getItem('userId');

  const [hasItems, setHasItems] = useState(false);
  const [editFolder, setEditFolder] = useState('');
  const [editFolderId, setEditFolderId] = useState(null);
  const [editFileId, setEditFileId] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const toggleShareInput = () => {
    setShowShareInput(!showShareInput);
  };

  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value);
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
          throw new Error('HTTP error! Status: ${response.status}');
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


  
  // State variables for managing the share input field
  


  // Function to share a file

  

  // Function to toggle visibility of the share input field


  const toggleFileOptions = (fileId) => {
    setFileOptions(!fileOptions);
    setSelectedFileId(fileId);
  };

  // Function to handle changes in the email address input
  

  // Function to handle sharing action
  

  // Function to toggle file options

  const toggleMessage = () => {
    setHasItems(!hasItems);
  };

  // States for editing


  //handling trash items
  const handleMoveToTrash = (id) => {
    const url = `http://127.0.0.1:5555/move-to-trash/${id}`; // Update the endpoint URL
    
    fetch(url, {
      method: 'PUT', // Change the method to PUT
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Send the is_delete field as true
        is_delete: true,
      })
    })
    .then(response => {
      if (response.ok) {
        // Remove the file or folder from the state
        if (id) {
          setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
        }
      } else {
        throw new Error('Failed to move item to trash');
      }
    })
    .catch(error => {
      console.error('Error moving item to trash:', error);
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
        console.log(data)
        
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

  const handleSaveClick = (myfileId) => {
    fetch(`http://127.0.0.1:5555/filefolder/${myfileId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ folder_name: editFolder })
    })
      .then(response => response.json())
      .then(data => {
        setFolders(prevFolders => prevFolders.map(folder =>
          folder.id === myfileId ? data : folder
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
            <div onClick={handleToggleFolders} className='ml-5 flex items-center cursor-pointer w-full mr-2'>
              {selectedFolders ? <TiTick /> : <MdFolderOpen size={20} className='mr-2' />}Folders
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
                    className={`flex w-[120px] h-full p-1 ${darkMode ? 'dark-mode3' : 'light-mode3'}`}
                  />
                  <button className='mr-2 ml-4' onClick={() => handleSaveClick(folder.id)}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              ) : (
                  <div className='flex  w-full justify-between   items-center '>
                    <Link to={`/folderdata/${folder.id}`} handleUpload={handleUpload}>
                      <h1 className='w-full'>{folder.folder_name}</h1>
                    </Link>
                    <SlOptionsVertical onClick={() => toggleOptions(folder.id)} size={15} className='mr-[20px]  cursor-pointer' />
                  </div>
                )}
              {options && selectedFolderId === folder.id && !editFolderId && (
                <div className={`w-[230px] flex flex-col gap-7 ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-[70px] shadow-md mt-[90px] p-4 absolute rounded-md ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[30px] flex justify-center`}>
                  <div className='flex w-full' onClick={() => handleEditClick(folder.id, folder.folder_name)}><h1 className='flex justify-between w-full'>Rename</h1> <MdOutlineDriveFileRenameOutline /></div>
                </div>
              )}
            </div>
          ))}
        </div>
        :
        <div className='flex overflow-y-auto h-full flex-col w-full  mt-5'>
          {folders.map(folder => (
            <div key={folder.id} className='flex  flex-col w-[940px] mb-5  ml-9 mr-9 items-center'>
              <div className='flex w-[940px] mb-5 justify-between ml-9 mr-9 items-center'>
                <TiFolderOpen size={20} className='mr-5' />
                {editFolderId === folder.id ? (
                  <div className=' flex items-center'>
                    <input
                      type="text"
                      value={editFolder}
                      onChange={handleInputChange}
                      className={` ${darkMode ? 'dark-mode-input' : 'light-mode-input'} w-[150px] mr-11 flex p-1`}
                    />
                    <button className='mr-9' onClick={() => handleSaveClick(folder.id)}>Save</button>
                    <button className='mr-9' onClick={handleCancelClick}>Cancel</button>
                  </div>
                ) : (
                    <div className='flex  w-full justify-between   items-center '>
                      <Link to={`/folderdata/${folder.id}`} handleUpload={handleUpload}>
                        <h1 className='w-full'>{folder.folder_name}</h1>
                      </Link>
                      <SlOptionsVertical onClick={() => toggleOptions(folder.id)} size={15} className='mr-[20px]  cursor-pointer' />
                    </div>
                  )}
              </div>
              <div className='w-full flex'>
                <hr className='w-full' />
              </div>
              {showShareInputFileId === file.id && (
              <div className="flex items-center mt-[20px] ml-[625px] flex-col">
                <input type="email" value={emailAddress} onChange={handleEmailChange} placeholder="Enter email address" className="mr-2 outline-none px-2 py-1 border border-gray-300 rounded" />
                <button onClick={() => handleShare(file.id)} className={`w-full p-2 mt-2 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}>Share</button>
              </div>
            )}
            </div>
          ))}
        </div>
        : ""
      }

      {selectedFiles ? gridView ?
        <div className='grid overflow-y-auto grid-cols-2 gap-5 mb-11 w-full ml-7 '>
          {files.map(file => (
            <div key={file.id} className='flex text-sm justify-between items-center w-full'>
            <img src={file.path} className="w-[40px] ml-7 h-[40px] rounded-full" />
              <h1 className='ml-4'>{file.filename}</h1>
              <SlOptionsVertical onClick={() => toggleFileOptions(file.id)} size={15} className='mr-[20px]  cursor-pointer' />
              {fileOptions && selectedFileId === file.id && (
                <div className={`w-[230px] flex  flex-col gap-7 ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-[70px] shadow-md mt-[260px] p-4 absolute rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[200px] flex justify-center`}>
                  <div className='flex w-full'><h1 className='flex justify-between w-full' onClick={() => handleMoveToTrash(file.id)}>Move to trash <FaRegTrashAlt /></h1></div>
                </div>
              )}
            </div>
          ))}
        </div>
        :
        <div className='flex  overflow-y-auto flex-col w-full h-full ml-7 mt-5'>

          <div className='flex w-full items-center mb-6 justify-between'>
          <h1 className='ml-[30px]'>File</h1>
            <h1 className='ml-[170px]'>Name</h1>
            <h1 className='ml-[110px]'>File type</h1>
            <h1 className='mr-[30px]'>Controls</h1></div>
          {files.map(file => (
            <div key={file.id} className='flex text-sm mb-5 justify-between  items-center w-full'>
             <img src={file.path} className="h-[40px] w-[40px] ml-7 rounded-full"/> 
              <h1 className='ml-4'>{file.filename}</h1>
              <h1 className='ml-2'>{file.file_type}</h1>
              <SlOptionsVertical onClick={() => toggleFileOptions(file.id)} className='mr-5' />
                                      {fileOptions && selectedFileId === file.id && (
                                        <div className={`absolute ${darkMode ? 'dark-mode3' : 'light-mode2'} p-3 right-0 mt-[50px] w-[170px] mr-[300px] flex  shadow-lg`}>
                                          <ul>
                                            <li onClick={() => handleMoveToTrash(file.id)} className='cursor-pointer p-2 justify-between flex w-full'>Move to Trash <FaRegTrashAlt size={15}  className='ml-8'/></li>
                                            {/* <li className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Star <FaRegStar size={15} /></li> */}
                                            <button onClick={() => handleStarFile(file.id)} className='cursor-pointer p-2 justify-between flex w-full'>
                    Star <FaRegStar size={15} />
                  </button>
                                            {/* <li className='cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>Unstar <FaStar size={15} /></li> */}
                                            <li onClick={toggleShareInput} className='cursor-pointer p-2 justify-between flex w-full'>Share <CiShare2 size={15}  className='ml-6'/></li>
                                            {showShareInput && (
                                              <div className='p-2'>
                                                <input
                                                  type="text"
                                                  value={emailAddress}
                                                  onChange={handleEmailChange}
                                                  placeholder="Enter email"
                                                  className={`w-full p-2 rounded ${darkMode ? 'dark-mode3' : 'light-mode2' } outline-none`}
                                                />
                                                <button onClick={() => handleShare(file.id)} className={`w-full p-2 mt-2 rounded ${darkMode ? 'dark-mode' : 'light-mode'}`}>Share</button>
                                              </div>
                                            )}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                            ))}
                          </div>
                          : ''
                    }
                  </div>
  );
};

export default Home;