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
import { Link } from 'react-router-dom';

const Recents = ({ darkMode, toggleMode, handleUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState(true);
  const [selectedFolders, setSelectedFolders] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [flexView, setFlexView] = useState(true);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [options, setOptions] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const userId = sessionStorage.getItem('userId');

  const [editFolder, setEditFolder] = useState('');
  const [editFolderId, setEditFolderId] = useState(null);

  const handleMoveToTrash = (itemId) => {
    fetch(`http://127.0.0.1:5555/trash/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trashed: true })
    })
    .then(response => response.json())
    .then(data => {
      setFolders(prevFolders => prevFolders.filter(folder => folder.id !== itemId));
      console.log('Item moved to trash:', data);
    })
    .catch(error => {
      console.error('Error moving item to trash:', error);
    });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/foldersuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFolders(data);
      });

    fetch(`http://127.0.0.1:5555/fileuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      });
  }, [userId]);

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

  return (
    <div className='flex  flex-col w-full h-full'>
      <div className=''>
        <div className='flex  w-full mt-5 items-center ml-7'><h1 className='text-xl'>Recent Items</h1></div>
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

      {selectedFolders ? gridView ?
        <div className='grid overflow-y-auto ml-9 mr-9 gap-x-5 grid-cols-3 w-[940px] gap-y-8 mt-5'>
          {folders.map(folder => (
            <div key={folder.id} className={`flex w-full h-[50px] justify-between rounded-xl items-center ${darkMode ? 'dark-mode3' : 'light-mode3'} cursor-pointer`}>
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
                <div className='flex w-full justify-between items-center '>
                  <Link to={`/folderdata/${folder.id}`} handleUpload={handleUpload}>
                    <h1 className='w-full'>{folder.folder_name}</h1>
                  </Link>
                  <SlOptionsVertical onClick={() => toggleOptions(folder.id)} size={15} className='mr-[20px] cursor-pointer' />
                </div>
              )}
              {options && selectedFolderId === folder.id && !editFolderId && (
                <div className={`w-[230px] flex flex-col gap-7 ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-[70px] shadow-md mt-[260px] p-4 absolute rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[200px] flex justify-center`}>
                  <div className='flex w-full' onClick={() => handleEditClick(folder.id, folder.folder_name)}><h1 className='flex justify-between w-full'>Rename</h1> <MdOutlineDriveFileRenameOutline /></div>
                  <div className='flex w-full'><h1 className='flex justify-between w-full' onClick={() => handleMoveToTrash(folder.id)}>Move to trash <FaRegTrashAlt /></h1></div>
                  <div className='flex w-full' onClick={() => toggleStar(folder.id, folder.starred)}><h1 className='flex justify-between w-full'>Star {folder.starred ? <FaStar /> : <FaRegStar />}</h1></div>
                </div>
              )}
            </div>
          ))}
        </div>
        :
        <div className='flex overflow-y-auto h-full flex-col w-full mt-5'>
          {folders.map(folder => (
            <div key={folder.id} className='flex flex-col w-[940px] mb-5 ml-9 mr-9 items-center'>
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
                  <div className='flex w-full justify-between items-center '>
                    <Link to={`/folderdata/${folder.id}`} handleUpload={handleUpload}>
                      <h1 className='w-full'>{folder.folder_name}</h1>
                    </Link>
                    <SlOptionsVertical onClick={() => toggleOptions(folder.id)} size={15} className='mr-[20px] cursor-pointer' />
                  </div>
                )}
              </div>
              <div className='w-full flex'>
                <hr className='w-full' />
              </div>
              {options && selectedFolderId === folder.id && !editFolderId && (
                <div className={`w-[230px] flex flex-col gap-7 ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-[650px] shadow-md mt-[60px] p-4 absolute rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[200px] flex justify-center`}>
                  <div className='flex w-full' onClick={() => handleEditClick(folder.id, folder.folder_name)}><h1 className='flex justify-between w-full'>Rename</h1> <MdOutlineDriveFileRenameOutline /></div>
                  <div className='flex w-full'><h1 className='flex justify-between w-full' onClick={() => handleMoveToTrash(folder.id)}>Move to trash <FaRegTrashAlt /></h1></div>
                  <div className='flex w-full'><h1 className='flex justify-between w-full'>Star <FaRegStar /></h1></div>
                </div>
              )}
            </div>
          ))}
        </div>
        : ""
      }

      {selectedFiles ? gridView ?
        <div className='grid overflow-y-auto grid-cols-3 w-full ml-7 '>
          {files.map(file => (
            <div key={file.id} className='flex items-center w-full'><img src='/src/assets/file.png' className='w-[30px] h-[30px] '/><h1 className='ml-4'>{file.filename}</h1></div>
          ))}
        </div>
        :
        <div className='flex overflow-y-auto flex-col w-full h-full ml-7 mt-5'>
          <div className='flex w-full items-center justify-between'>
            <h1 className='ml-[80px]'>Name</h1>
            <h1>File type</h1>
            <h1 className='mr-[120px]'>Size</h1>
          </div>
          {files.map(file => (
            <div key={file.id} className='flex flex-col items-center'>
              <div className='flex p-2 w-full items-center'>
                <img src='/src/assets/file.png' className='w-[30px] h-[30px]'/>
                <h1 className='ml-[30px]'>{file.filename}</h1>
                <h1 className='ml-[80px]'>{file.file_type}</h1>
                <h1 className='ml-[370px]'>{file.size}</h1>
              </div>
              <div className='w-full mr-[140px] flex'><hr className='w-full'/> </div>
            </div>
          ))}
        </div>
        : ""
      }
    </div>
  );
};

export default Recents;
