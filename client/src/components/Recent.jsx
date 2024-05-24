// import React, { useEffect, useState } from 'react';
// import { MdFolderOpen } from "react-icons/md";
// import { TiTick } from "react-icons/ti";
// import { FaRegFileAlt } from "react-icons/fa";
// import { IoGridOutline } from "react-icons/io5";
// import { FaBars } from "react-icons/fa6";
// import { TiFolderOpen } from "react-icons/ti";
// import { SlOptionsVertical } from "react-icons/sl";
// import { CiEdit } from "react-icons/ci";
// import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa6";

// const Recent = ({ darkMode, toggleMode }) => {
//   const [selectedFiles, setSelectedFiles] = useState(false);
//   const [selectedFolders, setSelectedFolders] = useState(false);
//   const [gridView, setGridView] = useState(false);
//   const [flexView, setFlexView] = useState(true);
//   const [folders, setFolders] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [options, setOptions] = useState(false);
//   const [selectedFolderId, setSelectedFolderId] = useState(null);
//   const userId = sessionStorage.getItem('userId');
  
//   // States for editing
//   const [editFolder, setEditFolder] = useState('');
//   const [editFolderId, setEditFolderId] = useState(null);

//   //handling trash items
//   const handleMoveToTrash = (itemId) => {
//     fetch(`http://127.0.0.1:5555/trash/${itemId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ trashed: true }) // Assuming you have a trashed field in your database schema
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Update UI to reflect changes, for example, remove the item from the view
//       setFolders(prevFolders => prevFolders.filter(folder => folder.id !== itemId));
//       console.log('Item moved to trash:', data);
//     })
//     .catch(error => {
//       console.error('Error moving item to trash:', error);
//     });
//   };


//   useEffect(() => {
//     fetch(`http://127.0.0.1:5555/foldersuser/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setFolders(data);
//       });
//   }, [userId]);

  

//   useEffect(() => {
//     fetch(`http://127.0.0.1:5555/fileuser/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setFiles(data);
//       });
//   }, [userId]);

//   // Edit folder
//   const handleEditClick = (id, currentName) => {
//     setEditFolderId(id);
//     setEditFolder(currentName);
//   };

//   const handleInputChange = (e) => {
//     setEditFolder(e.target.value);
//   };

//   const handleSaveClick = (id) => {
//     fetch(`http://127.0.0.1:5555/folders/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ folder_name: editFolder })
//     })
//       .then(response => response.json())
//       .then(data => {
//         setFolders(prevFolders => prevFolders.map(folder =>
//           folder.id === id ? data : folder
//         ));
//         console.log('Folder updated:', data);
//       })
//       .catch(error => {
//         console.error('Error updating folder:', error);
//       });

//     setEditFolderId(null);
//     setEditFolder('');
//   };

//   const handleCancelClick = () => {
//     setEditFolderId(null);
//     setEditFolder('');
//   };

//   const handleToggleFiles = () => {
//     setSelectedFiles(true);
//     setSelectedFolders(false);
//   };

//   const handleToggleFolders = () => {
//     setSelectedFiles(false);
//     setSelectedFolders(true);
//   };

//   const handleToggleGrid = () => {
//     setGridView(prevMode => !prevMode);
//     setFlexView(false);
//   };

//   const handleToggleFlex = () => {
//     setFlexView(prevMode => !prevMode);
//     setGridView(false);
//   };

//   const toggleOptions = (folderId) => {
//     setOptions(!options);
//     setSelectedFolderId(folderId);
//   };

//   return (
//     <div className='flex  flex-col w-full h-full'>
//       <div className=''>
//       <div className='flex  w-full mt-5 items-center ml-7'><h1 className='text-xl'>Welcome to CloudStore</h1></div>
//       <div className='flex w-full mt-5 justify-between items-center ml-9'>
//         <h1>My Items</h1>
//         <div className={`flex w-[200px] mr-[300px] ${darkMode ? 'dark-mode3' : 'light-mode3'} p-1 items-center rounded-full`}>
//           <div onClick={handleToggleFiles} className='ml-1 flex items-center w-full border-r border-black'>
//             {selectedFiles ? <TiTick /> : <FaRegFileAlt size={15} className='mr-2' />}<button>Files</button>
//           </div>
//           <div onClick={handleToggleFolders} className='ml-5 flex items-center w-full mr-2'>
//             {selectedFolders ? <TiTick /> : <MdFolderOpen size={20} className='mr-2' />}Folders
//           </div>
//         </div>
//         <div className={`flex w-[100px] mr-[80px] ${darkMode ? 'dark-mode3' : 'light-mode3'} border p-1 items-center rounded-full`}>
//           <div onClick={handleToggleFlex} className='ml-1 flex items-center w-full border-r border-black'>
//             {flexView ? <TiTick /> : ''}<FaBars size={20} />
//           </div>
//           <div onClick={handleToggleGrid} className='justify-center flex items-center w-full mr-2'>
//             {gridView ? <TiTick /> : ''}<IoGridOutline size={20} />
//           </div>
//         </div>
//       </div>
//       </div>

//       {selectedFolders ? gridView ?
//         <div className='grid overflow-y-auto  ml-9 mr-9 gap-x-5 grid-cols-3 w-[940px] gap-y-8 mt-5'>
//           {folders.map(folder => (
//             <div key={folder.id} className={`flex w-full h-[50px] rounded-xl  items-center ${darkMode ? 'dark-mode3' : 'light-mode3'} cursor-pointer`}>
//               <TiFolderOpen size={20} className='mr-5 ml-5' />
//               {editFolderId === folder.id ? (
//                 <div className='flex w-full '>
//                   <input
//                     type="text"
//                     value={editFolder}
//                     onChange={handleInputChange}
//                     className={`flex w-[120px] h-full p-1 ${darkMode ? 'dark-mode3' : 'light-mode3'}`}
//                   />
//                   <button className='mr-2 ml-4' onClick={() => handleSaveClick(folder.id)}>Save</button>
//                   <button onClick={handleCancelClick}>Cancel</button>
//                 </div>
//               ) : (
//                 <div className='flex  w-full items-center '>
//                   <h1 className='w-full'>{folder.folder_name}</h1>
//                   <SlOptionsVertical onClick={() => toggleOptions(folder.id)} size={15} className='mr-[20px]  cursor-pointer' />
//                 </div>
//               )}
//               {options && selectedFolderId === folder.id && !editFolderId && (
//                 <div className={`w-[230px] flex flex-col gap-7 ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-[70px] shadow-md mt-[260px] p-4 absolute rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[200px] flex justify-center`}>
//                   <div className='flex w-full' onClick={() => handleEditClick(folder.id, folder.folder_name)}><h1 className='flex justify-between w-full'>Rename</h1> <MdOutlineDriveFileRenameOutline /></div>
//                   <div className='flex w-full'><h1 className='flex justify-between w-full' onClick={() => handleMoveToTrash(folder.id)}>Move to trash <FaRegTrashAlt /></h1></div>
//                   <div className='flex w-full' onClick={() => toggleStar(folder.id, folder.starred)}><h1 className='flex justify-between w-full'>Star {folder.starred ? <FaStar /> : <FaRegStar />}</h1></div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         :
//         <div className='flex overflow-y-auto h-full flex-col w-full  mt-5'>
//           {folders.map(folder => (
//             <div key={folder.id} className='flex  flex-col w-[940px] mb-5 justify-between ml-9 mr-9 items-center'>
//               <div className='flex w-[940px] mb-5 justify-between ml-9 mr-9 items-center'>
//                 <TiFolderOpen size={20} className='mr-5' />
//                 {editFolderId === folder.id ? (
//                   <div className=' flex items-center'>
//                     <input
//                       type="text"
//                       value={editFolder}
//                       onChange={handleInputChange}
//                       className={` ${darkMode ? 'dark-mode-input' : 'light-mode-input'} w-[150px] mr-11 flex p-1`}
//                     />
//                     <button className='mr-9' onClick={() => handleSaveClick(folder.id)}>Save</button>
//                     <button className='mr-9' onClick={handleCancelClick}>Cancel</button>
//                   </div>
//                 ) : (
//                   <div className='flex items-center '>
//                     <h1 className='flex justify-start'>{folder.folder_name}</h1>
//                     <SlOptionsVertical onClick={() => toggleOptions(folder.id)} size={15} className='ml-[130px] cursor-pointer' />
//                   </div>
//                 )}
//               </div>
//               <div className='w-full flex'>
//                 <hr className='w-full' />
//               </div>
//               {options && selectedFolderId === folder.id && !editFolderId && (
//                 <div className={`w-[230px] flex flex-col gap-7 ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-[650px] shadow-md mt-[60px] p-4 absolute rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[200px] flex justify-center`}>
//                   <div className='flex w-full' onClick={() => handleEditClick(folder.id, folder.folder_name)}><h1 className='flex justify-between w-full'>Rename</h1> <MdOutlineDriveFileRenameOutline /></div>
//                   <div className='flex w-full'><h1 className='flex justify-between w-full' onClick={() => handleMoveToTrash(folder.id)}>Move to trash <FaRegTrashAlt /></h1></div>
//                   <div className='flex w-full'><h1 className='flex justify-between w-full'>Star <FaRegStar /></h1></div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         : ""
//       }

//       {selectedFiles ? gridView ?
//         <div className='grid overflow-y-auto grid-cols-3 w-full ml-7 '>
//           {files.map(file => (
//             <div key={file.id} className='flex items-center'><TiFolderOpen size={20} className='mr-5' /><h1>{file.filename}</h1></div>
//           ))}
//         </div>
//         :
//         <div className='flex overflow-y-auto flex-col w-full h-full ml-7 mt-5'>
//           {files.map(file => (
//             <div key={file.id} className='flex items-center'><TiFolderOpen size={20} className='mr-5' /><h1>{file.filename}</h1></div>
//           ))}
//         </div>
//         : ""
//       }
//     </div>
//   );
// };

// export default Recent;





function Recent() {
  const [files, setFiles] = useState([]);
  const [sortedFiles, setSortedFiles] = useState({
    today: [],
    earlierThisWeek: [],
    earlierThisMonth: [],
    thisYear: [],
    older: [],
  });
  const [selectedFiles, setSelectedFiles] = useState(true);
  const [selectedFolders, setSelectedFolders] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [flexView, setFlexView] = useState(true);
  const [options, setOptions] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  useEffect(() => {
    const initialFiles = [
      { name: 'file1.txt', date: '2024-05-19T12:00:00Z' },
      { name: 'file2.txt', date: '2024-05-20T14:30:00Z' },
      { name: 'file3.txt', date: '2024-05-20T10:15:00Z' },
      { name: 'file4.txt', date: '2024-05-15T08:00:00Z' },
      { name: 'file5.txt', date: '2024-04-25T16:45:00Z' },
      { name: 'file6.txt', date: '2023-01-31T23:59:59Z' },
      { name: 'file7.txt', date: '2024-05-21T09:30:00Z' },
    ];
    setFiles(initialFiles);
    sortFilesByDate(initialFiles);
  }, []);

  const sortFilesByDate = (files) => {
    const sortedFiles = files.sort((a, b) => new Date(b.date) - new Date(a.date));
    const currentDate = new Date();

    const categorizedFiles = {
      today: [],
      earlierThisWeek: [],
      earlierThisMonth: [],
      thisYear: [],
      older: [],
    };

    sortedFiles.forEach((file) => {
      const fileDate = new Date(file.date);
      if (isSameDay(fileDate, currentDate)) {
        categorizedFiles.today.push(file);
      } else if (isEarlierThisWeek(fileDate, currentDate)) {
        categorizedFiles.earlierThisWeek.push(file);
      } else if (isEarlierThisMonth(fileDate, currentDate)) {
        categorizedFiles.earlierThisMonth.push(file);
      } else if (isThisYear(fileDate, currentDate)) {
        categorizedFiles.thisYear.push(file);
      } else {
        categorizedFiles.older.push(file);
      }
    });

    setSortedFiles(categorizedFiles);
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isEarlierThisWeek = (date, currentDate) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const dayDifference = Math.abs(Math.floor((currentDate - date) / millisecondsPerDay));
    return dayDifference <= currentDate.getDay();
  };

  const isEarlierThisMonth = (date, currentDate) => {
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() < currentDate.getDate()
    );
  };

  const isThisYear = (date, currentDate) => {
    return (
      date.getFullYear() === currentDate.getFullYear() && date.getMonth() < currentDate.getMonth()
    );
  };

  const renderFiles = (files) => {
    return files.map((file, index) => (
      <li key={index} className="p-2 border-b border-gray-200">
        {file.name} - {file.date}
      </li>
    ));
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
    setGridView((prevMode) => !prevMode);
    setFlexView(false);
  };

  const handleToggleFlex = () => {
    setFlexView((prevMode) => !prevMode);
    setGridView(false);
  };

  const toggleOptions = (folderId) => {
    setOptions(!options);
    setSelectedFolderId(folderId);
  };

import React, { useState, useEffect } from 'react';

const Recent = () => {
  //  store recent items
  const [recentItems, setRecentItems] = useState([]);

  // fetch recent items from the cloud store
  const fetchRecentItems = async () => {
    try {
      // Make a GET request to fetch recent items from the cloud store API
      const response = await fetch('https://api.cloudstore.com/recent');
      
      // Check if the request was successful 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

     
      const data = await response.json();

      // Set the recent items state with the data from the response
      setRecentItems(data);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem fetching recent items:', error);
    }
  };

  // useEffect hook to fetch recent items when the component mounts
  useEffect(() => {
    fetchRecentItems();
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-6">
      <div className="flex flex-col items-start w-full">
        <h1 className="text-2xl font-semibold mb-4">Welcome to CloudStore</h1>
        <div className="flex justify-between w-full items-center mb-4">
          <h1 className="text-lg font-medium">My Items</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-full space-x-2 cursor-pointer" onClick={handleToggleFiles}>
              {selectedFiles ? <TiTick /> : <FaRegFileAlt size={15} />}
              <button className="focus:outline-none">Files</button>
            </div>
            <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-full space-x-2 cursor-pointer" onClick={handleToggleFolders}>
              {selectedFolders ? <TiTick /> : <TiFolderOpen size={20} />}
              <span>Folders</span>
            </div>
            <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-full space-x-2 cursor-pointer">
              <div onClick={handleToggleFlex} className="flex items-center space-x-2">
                {flexView ? <TiTick /> : ''}
                <FaBars size={20} />
              </div>
              <div onClick={handleToggleGrid} className="flex items-center space-x-2">
                {gridView ? <TiTick /> : ''}
                <IoGridOutline size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">Sorted Files</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">Today</h2>
            <ul className="pl-4">{renderFiles(sortedFiles.today)}</ul>
          </div>
          <div>
            <h2 className="text-lg font-medium">Earlier This Week</h2>
            <ul className="pl-4">{renderFiles(sortedFiles.earlierThisWeek)}</ul>
          </div>
          <div>
            <h2 className="text-lg font-medium">Earlier This Month</h2>
            <ul className="pl-4">{renderFiles(sortedFiles.earlierThisMonth)}</ul>
          </div>
          <div>
            <h2 className="text-lg font-medium">This Year</h2>
            <ul className="pl-4">{renderFiles(sortedFiles.thisYear)}</ul>
          </div>
          <div>
            <h2 className="text-lg font-medium">Older</h2>
            <ul className="pl-4">{renderFiles(sortedFiles.older)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recent;