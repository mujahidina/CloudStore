import React, { useEffect, useState } from 'react';
import { MdFolderOpen } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaRegFileAlt } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { TiFolderOpen } from "react-icons/ti";
import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { categorizeFolders } from './dateUtils'; // import the helper function

const Recent = ({ darkMode, toggleMode }) => {
  const [selectedFiles, setSelectedFiles] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [flexView, setFlexView] = useState(true);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [options, setOptions] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const userId = sessionStorage.getItem('userId');

  // States for editing
  const [editFolder, setEditFolder] = useState('');
  const [editFolderId, setEditFolderId] = useState(null);

  // Fetching folders
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/foldersuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Folders:', data); // Log fetched folders
        setFolders(data);
      });
  }, [userId]);

  // Fetching files
  useEffect(() => {
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
    fetch(`http://127.0.0.1:5555/folders/${id}`, {
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

  // Categorize folders
  const categorizedFolders = categorizeFolders(folders);

  return (
    <div className='flex flex-col w-full h-full'>
      <div className=''>
        <div className='flex w-full mt-5 items-center ml-7'><h1 className='text-xl'>Welcome to CloudStore</h1></div>
        <div className='flex w-full mt-5 justify-between items-center ml-9'>
          <h1>My Items</h1>
          <div className={`flex w-[200px] mr-[300px] ${darkMode ? 'dark-mode3' : 'light-mode3'} p-1 items-center rounded-full`}>
            <div onClick={handleToggleFiles} className='ml-1 flex items-center w-full border-r border-black'>
              {selectedFiles ? <TiTick /> : <FaRegFileAlt size={15} className='mr-2' />}<button>Files</button>
            </div>
            <div onClick={handleToggleFolders} className='ml-5 flex items-center w-full mr-2'>
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

      {selectedFolders && (
        <div className='mt-5'>
          {Object.entries(categorizedFolders).map(([category, folders]) => (
            folders.length > 0 && (
              <div key={category}>
                <h2 className='ml-9'>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <div className={`flex ${gridView ? 'grid grid-cols-3 gap-5' : 'flex-col'} ml-9 mr-9 mt-2`}>
                  {folders.map(folder => (
                    <div key={folder.id} className={`flex w-full h-[50px] rounded-xl items-center ${darkMode ? 'dark-mode3' : 'light-mode3'} cursor-pointer`}>
                      <TiFolderOpen size={20} className='mr-5 ml-5' />
                      {editFolderId === folder.id ? (
                        <div className='flex w-full'>
                          <input
                            type="text"
                            value={editFolder}
                            onChange={handleInputChange}
                            className={`flex w-full ${darkMode ? 'dark-mode3' : 'light-mode3'} border rounded-xl`}
                          />
                          <div className='flex'>
                            <button onClick={() => handleSaveClick(folder.id)} className='ml-2'>Save</button>
                            <button onClick={handleCancelClick} className='ml-2'>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h1>{folder.folder_name}</h1>
                          <SlOptionsVertical onClick={() => toggleOptions(folder.id)} className='ml-auto mr-5' />
                        </>
                      )}
                      {options && selectedFolderId === folder.id && (
                        <div className={`w-[230px] flex flex-col gap-7 ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-[70px] shadow-md mt-[260px] p-4 absolute rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[200px] flex justify-center`}>
                          <div className='flex w-full' onClick={() => handleEditClick(folder.id, folder.folder_name)}><h1 className='flex justify-between w-full'>Rename</h1> <MdOutlineDriveFileRenameOutline /></div>
                          <div className='flex w-full'><h1 className='flex justify-between w-full' onClick={() => handleMoveToTrash(folder.id)}>Move to trash <FaRegTrashAlt /></h1></div>
                          <div className='flex w-full' onClick={() => toggleStar(folder.id, folder.starred)}><h1 className='flex justify-between w-full'>Star {folder.starred ? <FaStar /> : <FaRegStar />}</h1></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {selectedFiles && (
        <div className={`flex ${gridView ? 'grid grid-cols-3 gap-5' : 'flex-col'} ml-7 mt-5`}>
          {files.map(file => (
            <div key={file.id} className='flex items-center'><TiFolderOpen size={20} className='mr-5' /><h1>{file.filename}</h1></div>
          ))}
        </div>
      )}
      
    </div>
    
  );
};



export default Recent;
