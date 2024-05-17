import React, { useEffect, useState } from 'react';
import { MdFolderOpen } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoGridOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";

const Shared = ({ myid }) => {
  const [selectedFiles, setSelectedFiles] = useState(true); // Default to files view
  const [selectedFolders, setSelectedFolders] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [folders, setFolders] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);

  useEffect(() => {
    fetchSharedFolders();
    fetchSharedFiles();
  }, []);

  const fetchSharedFolders = () => {
    fetch(`http://127.0.0.1:5555/sharedfolders/${myid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch shared folders');
        }
        return response.json();
      })
      .then((data) => {
        setFolders(data);
      })
      .catch((error) => {
        console.error('Error fetching shared folders:', error);
      });
  };

  const fetchSharedFiles = () => {
    fetch(`http://127.0.0.1:5555/shares`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch shared files');
        }
        return response.json();
      })
      .then((data) => {
        setSharedFiles(data);
      })
      .catch((error) => {
        console.error('Error fetching shared files:', error);
      });
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
    setGridView(true);
  };

  const handleToggleFlex = () => {
    setGridView(false);
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex w-full mt-5 items-center ml-7'>
        <h1 className='text-xl'>Shared with Me</h1>
      </div>
      {/* Header */}
      <div className='flex w-full mt-5 justify-between items-center ml-7'>
        <h1>Shared</h1>
        <div className='flex w-[200px] mr-[300px] border p-1 items-center rounded-full'>
          <div onClick={handleToggleFiles} className='ml-1 flex items-center w-full border-r border-black cursor-pointer'>
            {selectedFiles && <TiTick />}
            <button className='ml-2'>Files</button>
          </div>
          <div onClick={handleToggleFolders} className='ml-5 flex items-center w-full mr-2 cursor-pointer'>
            {selectedFolders && <TiTick />}
            <MdFolderOpen size={20} className='mr-2' />Folders
          </div>
        </div>
        <div className='flex w-[100px] mr-[100px] border p-1 items-center rounded-full'>
          <div onClick={handleToggleFlex} className='ml-1 flex items-center w-full border-r border-black cursor-pointer'>
            {!gridView && <TiTick />}
            <FaBars size={20} />
          </div>
          <div onClick={handleToggleGrid} className='justify-center flex items-center w-full mr-2 cursor-pointer'>
            {gridView && <TiTick />}
            <IoGridOutline size={20} />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className={`w-full mt-5 ${gridView ? 'grid grid-cols-1 md:grid-cols-3' : 'flex flex-col'}`}>
        {/* Header Row */}
        <div className={`grid grid-cols-3 bg-gray-200 p-2 font-bold border-t border-b border-gray-400`}>
          <div className="shared-column">Name</div>
          <div className="shared-column">Owner</div>
          <div className="shared-column">File Type</div>
        </div>
        {/* Render folders */}
        {selectedFolders && folders.map(folder => (
          <div key={folder.id} className="bg-gray-100 p-4 rounded-md grid grid-cols-3">
            <div className="shared-column font-semibold">{folder.name}</div>
            <div className="shared-column">{folder.owner}</div>
            <div className="shared-column">{folder.size}</div>
          </div>
        ))}
        {/* Render shared files */}
        {selectedFiles && sharedFiles.map(file => (
          <div key={file.file_id} className="bg-gray-100 p-4 rounded-md grid grid-cols-3">
            <div className="shared-column font-semibold">{file.file_id}</div>
            <div className="shared-column">{file.user_id}</div>
            <div className="shared-column">{file.share_type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shared;
