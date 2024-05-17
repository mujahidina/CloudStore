import React, { useEffect, useState } from 'react';
import { MdFolderOpen } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaRegFileAlt } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { TiFolderOpen } from "react-icons/ti";
// import UploadWidget from './UploadWidget';



const Home = ({darkMode, toggleMode}) => {
  const [selectedFiles, setSelectedFiles] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [flexView, setFlexView] = useState(true);
  const [folders, setFolders] = useState([]);
  const [files, setFiles]=useState([])
  const userId=sessionStorage.getItem('userId');
  
 
  
useEffect(() => {
  fetch(`http://127.0.0.1:5555/foldersuser/${userId}`)
   .then((response) => response.json())
   .then((data) => {
      console.log(data);
      setFolders(data);
    })},[]);

    useEffect(() => {
      fetch(`http://127.0.0.1:5555/fileuser/${userId}`)
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setFiles(data);
        })},[]);

  

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

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex w-full mt-5 items-center ml-7'><h1 className='text-xl'>Welcome to CloudStore</h1></div>
      <div className='flex w-full mt-5 justify-between items-center ml-7'>
        <h1>Suggested</h1>
        <div className={`flex w-[200px] mr-[300px] ${darkMode ? 'dark-mode3' : 'light-mode3'} p-1 items-center rounded-full`}>
          <div onClick={handleToggleFiles} className='ml-1 flex items-center w-full border-r border-black'>
            {selectedFiles ? <TiTick /> : <FaRegFileAlt size={15} className='mr-2'/>}<button >Files</button>
          </div>
          <div onClick={handleToggleFolders} className='ml-5 flex items-center w-full mr-2'>
            {selectedFolders ? <TiTick /> : <MdFolderOpen size={20} className='mr-2'/>}Folders
          </div>
        </div>
        <div className={`flex w-[100px] mr-[100px] ${darkMode ? 'dark-mode3' : 'light-mode3'} border p-1 items-center rounded-full`}>
          <div onClick={handleToggleFlex} className='ml-1 flex items-center w-full border-r border-black'>
            {flexView ? <TiTick /> : ''}<FaBars size={20}/>
          </div>
          <div onClick={handleToggleGrid} className='justify-center flex items-center w-full mr-2'>
            {gridView ? <TiTick /> : ''}<IoGridOutline size={20}/>
          </div>
        </div>
       
      </div>
      
      {selectedFolders ? gridView?
        <div className='grid grid-cols-3 w-full h-full mt-5'>
          {folders.map(folder=>(
           <div key={folder.id} className='flex items-center '><TiFolderOpen size={20} className='mr-5'/><h1 >{folder.folder_name}</h1></div>
          ))}
         
        </div> 
         : <div className='flex flex-col w-full h-full mt-5'>
           {folders.map(folder=>(
           <div key={folder.id} className='flex items-center '><TiFolderOpen size={20} className='mr-5'/><h1 >{folder.folder_name}</h1></div>
          ))}
        
      </div> :""
      }

      {selectedFiles ? gridView?
        <div className='grid grid-cols-3 w-full ml-7 '>
          {files.map(file=>(
           <div key={file.id} className='flex items-center '><TiFolderOpen size={20} className='mr-5'/><h1 >{file.filename}</h1></div>
          ))}  
        </div> 
        : <div className='flex flex-col w-full h-full ml-7 mt-5'>
           
           {files.map(file=>(
           <div key={file.id} className='flex items-center '><TiFolderOpen size={20} className='mr-5'/><h1 >{file.filename}</h1></div>
          ))} 
            
      </div> :""
      }
    </div>
  );
};

export default Home;
