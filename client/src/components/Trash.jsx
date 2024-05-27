import React, { useEffect, useState } from 'react';
import { TiTick } from "react-icons/ti";
import { IoGridOutline } from "react-icons/io5";
import { FaBars, FaRegTrashAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

const Trash = ({ darkMode, toggleMode }) => {
  const [gridView, setGridView] = useState(false);
  const [flexView, setFlexView] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [trashItem, setTrashItem] = useState([]);
  const [fileOptions, setFileOptions] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null); // Initialize selectedFileId

  const userId = sessionStorage.getItem('userId');

  const toggleFileOptions = (fileId) => {
    setFileOptions(!fileOptions);
    setSelectedFileId(fileId);
  };

  const handleToggleGrid = () => {
    setGridView(!gridView);
    setFlexView(false);
  };

  const handleToggleFlex = () => {
    setFlexView(!flexView);
    setGridView(false);
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5555/deletefiles/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setTrashItem(prevTrashItems => prevTrashItems.filter(item => item.id !== id)); // Changed 'id' to 'fileId' here
        setIsEmpty(prevTrashItems => prevTrashItems.length === 1);
        setFileOptions(false);
        setSelectedFileId(null);
      } else {
        throw new Error('Failed to delete file');
      }
    })
    .catch(error => {
      console.error('Error deleting file:', error);
      // Handle error here
    });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/trashfiles/${userId}`)
      .then(response => response.json())
      .then(data => {
        setTrashItem(data);
        setIsEmpty(data.length === 0);

      })
      .catch(error => {
        console.error('Error fetching trash files:', error);
        // Handle error here
      });
  }, [userId]);

  return (
    <div className='w-full h-full flex flex-col items-center '>
      <div className='flex h-[30px] w-full mt-[20px] items-center justify-between ml-7'>
        <h1 className='ml-5 text-xl'>Manage your Trash</h1>
        <div className={`flex w-[100px] mr-[100px] ${darkMode ? 'dark-mode3' : 'light-mode3'} border p-1 items-center rounded-full`}>
          <div onClick={handleToggleFlex} className='ml-1 flex items-center w-full border-r border-black'>
            {flexView ? <TiTick /> : ''}<FaBars size={20}/>
          </div>
          <div onClick={handleToggleGrid} className='justify-center flex items-center w-full mr-2'>
            {gridView ? <TiTick /> : ''}<IoGridOutline size={20}/>
          </div>
        </div>
      </div>
      {isEmpty ? (
        <div>
          <img src='/public/trash.png' className='w-[300px] h-[300px]' alt="Trash Can"/>
          <div className='flex flex-col w-full mt-5 items-center justify-center'>
            <h1 className='text-xl mb-5'>Nothing in Trash!</h1>
            <h1 className='text-sm'>Move items you don't need to trash. Once you delete them here,</h1>
            <h1 className='text-sm'>They'll be gone for good!</h1>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full items-center mt-8'>
          {trashItem.map(file => (
            <div className='flex w-full text-sm items-center justify-between p-2 p-x-9' key={file.id}>
              <img src='/public/file.png' className='w-[30px] h-[30px] ml-[40px]' alt="File Icon"/>
              <div className='flex items-center'>{file.filename}</div>
              <div className='flex items-center'>{file.file_type}</div>
              <SlOptionsVertical onClick={() => toggleFileOptions(file.id)} size={10} className='mr-[70px] cursor-pointer' />

              {fileOptions && selectedFileId === file.id && (
                <div className={`w-[230px] flex flex-col gap-7 ${darkMode ? 'dark-mode3' : 'light-mode3'} cursor-pointer ml-[700px] shadow-md mt-[50px] p-5 absolute rounded-md ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[50px] flex justify-center`}>
                  <div className='flex flex-col w-full'>
                    <h1 className='flex justify-between items-center w-full' onClick={() => handleDelete(file.id)}>Delete<FaRegTrashAlt /></h1>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;
