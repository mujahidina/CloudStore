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

const Home = ({ darkMode, toggleMode }) => {
  const [selectedFiles, setSelectedFiles] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [flexView, setFlexView] = useState(true);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [options, setOptions] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/foldersuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFolders(data);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/fileuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFiles(data);
      });
  }, [userId]);

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
      <div className='flex w-full mt-5 items-center ml-7'><h1 className='text-xl'>Welcome to CloudStore</h1></div>
      <div className='flex w-full mt-5 justify-between items-center ml-11'>
        <h1>My Items</h1>
        <div className={`flex w-[200px] mr-[300px] ${darkMode ? 'dark-mode3' : 'light-mode3'} p-1 items-center rounded-full`}>
          <div onClick={handleToggleFiles} className='ml-1 flex items-center w-full border-r border-black'>
            {selectedFiles ? <TiTick /> : <FaRegFileAlt size={15} className='mr-2'/>}<button>Files</button>
          </div>
          <div onClick={handleToggleFolders} className='ml-5 flex items-center w-full mr-2'>
            {selectedFolders ? <TiTick /> : <MdFolderOpen size={20} className='mr-2'/>}Folders
          </div>
        </div>
        <div className={`flex w-[100px] mr-[80px] ${darkMode ? 'dark-mode3' : 'light-mode3'} border p-1 items-center rounded-full`}>
          <div onClick={handleToggleFlex} className='ml-1 flex items-center w-full border-r border-black'>
            {flexView ? <TiTick /> : ''}<FaBars size={20}/>
          </div>
          <div onClick={handleToggleGrid} className='justify-center flex items-center w-full mr-2'>
            {gridView ? <TiTick /> : ''}<IoGridOutline size={20}/>
          </div>
        </div>
      </div>

      {selectedFolders ? gridView ?
        <div className='grid ml-9 mr-9 gap-x-5 grid-cols-3 w-[940px] gap-y-8 mt-5'>
          {folders.map(folder => (
            <div key={folder.id} className={`flex w-full h-[50px] rounded-xl items-center ${darkMode ? 'dark-mode3' : 'light-mode3'} cursor-pointer`}>
              <TiFolderOpen size={20} className='mr-5 ml-5' /><h1>{folder.folder_name}</h1>
              <SlOptionsVertical onClick={() => toggleOptions(folder.id)} size={15} className='ml-[130px] cursor-pointer' />
              {options && selectedFolderId === folder.id && (
                <div className={`w-[230px] flex flex-col gap-9 ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-[70px] shadow-md mt-[260px] p-4 absolute rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[200px] flex justify-center`}>
                  <div className='flex w-full  '><h1 className='flex justify-between w-full'>Edit</h1> <CiEdit size={15} /></div>
                <div className='flex w-full  '><h1 className='flex justify-between w-full'>Rename <MdOutlineDriveFileRenameOutline /></h1></div>
                <div className='flex w-full  '><h1 className='flex justify-between w-full'>Move to trash <FaRegTrashAlt /></h1></div>
                </div>
              )}
            </div>
          ))}
        </div>
        :
        <div className='flex flex-col w-full h-full mt-5'>
          {folders.map(folder => (
            <div key={folder.id} className='flex flex-col w-[940px] mb-5 justify-between ml-9 mr-9 items-center'>
              <div className='flex  w-[940px] mb-5 justify-between ml-9 mr-9 items-center'>
              <TiFolderOpen size={20} className='mr-5' /><h1 className='flex justify-start'>{folder.folder_name}</h1>
              <SlOptionsVertical onClick={() => toggleOptions(folder.id)} size={15} className='ml-[130px] cursor-pointer' />
              </div>
              <div className='w-full flex '> <hr className='w-full'/></div>
            {options && selectedFolderId === folder.id && (
                <div className={`w-[230px] flex flex-col gap-9 ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-[650px] shadow-md mt-[60px] p-4 absolute rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[200px] flex justify-center`}>
                <div className='flex w-full  '><h1 className='flex justify-between w-full'>Edit</h1> <CiEdit size={15} /></div>
                <div className='flex w-full  '><h1 className='flex justify-between w-full'>Rename <MdOutlineDriveFileRenameOutline /></h1></div>
                <div className='flex w-full  '><h1 className='flex justify-between w-full'>Move to trash <FaRegTrashAlt /></h1></div>
                </div>
                
              )}
               
            </div>

             
             
          ))}
            
        </div>
        : ""
      }

      {selectedFiles ? gridView ?
        <div className='grid grid-cols-3 w-full ml-7 '>
          {files.map(file => (
            <div key={file.id} className='flex items-center'><TiFolderOpen size={20} className='mr-5' /><h1>{file.filename}</h1></div>
          ))}
        </div>
        :
        <div className='flex flex-col w-full h-full ml-7 mt-5'>
          {files.map(file => (
            <div key={file.id} className='flex items-center'><TiFolderOpen size={20} className='mr-5' /><h1>{file.filename}</h1></div>
          ))}
        </div>
        : ""
      }
    </div>
  );
};

export default Home;
