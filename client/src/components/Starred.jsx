// import React, { useEffect, useState } from 'react';
// import { TiTick } from "react-icons/ti";
// import { IoGridOutline } from "react-icons/io5";
// import { FaBars } from "react-icons/fa6";

// const Starred = ({darkMode, toggleMode}) => {
//   const [gridView, setGridView] = useState(false);
//   const [flexView, setFlexView] = useState(true);

//   const handleToggleGrid = () => {
//     setGridView(prevMode => !prevMode);
//     setFlexView(false);
//   };

//   const handleToggleFlex = () => {
//     setFlexView(prevMode => !prevMode);
//     setGridView(false);
//   };

//   return (
//     <div className=' w-full h-full flex flex-col items-center justify-center'>
//        <div className='flex w-full mt-5 items-center justify-between ml-7'><h1 className=' ml-5 text-xl'>Starred</h1>
//         <div className={`flex w-[100px] mr-[100px] ${darkMode ? 'dark-mode3' : 'light-mode3'} border p-1 items-center rounded-full`}>
//           <div onClick={handleToggleFlex} className='ml-1 flex items-center w-full border-r border-black'>
//             {flexView ? <TiTick /> : ''}<FaBars size={20}/>
//           </div>
//           <div onClick={handleToggleGrid} className='justify-center flex items-center w-full mr-2'>
//             {gridView ? <TiTick /> : ''}<IoGridOutline size={20}/>
//           </div>
//           </div>
//           </div>
//       <div>
//         <img src='/public/star.png' className='w-[300px] h-[300px]'/>
//       </div>
//       <div className='flex flex-col w-full mt-5 items-center justify-center'>
//         <h1 className='text-xl mb-5'>No starred files!</h1>
//         <h1 className='text-sm'>Add stars to things you want to easily find later.</h1>
       
//       </div>

//     </div>
   
//   )
// }

// export default Starred

import React, { useState, useEffect } from 'react';

const Starred = ({  darkMode }) => {
  const [files, setFiles] = useState([]);
  const userId=sessionStorage.getItem('userId')

  useEffect(() => {
    const url = `http://127.0.0.1:5555/starreditems/${userId}`;
    console.log('Fetch URL:', url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched files:', data);
        setFiles(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
  }, [userId]);

  const handleUnstar = (fileId) => {
    fetch(`http://127.0.0.1:5555/starreditem/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to unstar file');
      }
      setFiles(files.filter((file) => file.file_id !== fileId));
    })
    .catch((error) => {
      console.error('Unstar error:', error.message);
    });
  };

  return (
    <div className={`container w-full h-full flex flex-col ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='text-2xl m-3'>
        Starred
      </div>
      <div className='flex overflow-y-auto flex-col w-full h-full ml-7 mt-5'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='ml-[80px]'>Name</h1>
          <h1 className='mr-[120px]'>Size</h1>
        </div>
        {files.map(file => (
          <div key={file.file_id} className='flex flex-col items-center'>
            <div className='flex p-2 w-full items-center'>
              <img src={file.file && file.file.path ? file.file.path : '/src/assets/file.png'} className='w-[30px] h-[30px]' alt={file.file && file.file.filename} />
              <h1 className='ml-[30px]'>{file.file && file.file.filename}</h1>
              <h1 className='ml-[80px]'>{file.file && file.file.size}</h1>
              <button onClick={() => handleUnstar(file.file_id)}>Unstar</button>
            </div>
            <div className='w-full mr-[140px] flex'><hr className='w-full' /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Starred;