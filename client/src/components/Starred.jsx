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
//         <img src='/src/assets/star.png' className='w-[300px] h-[300px]'/>
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
import { TiTick } from "react-icons/ti";
import { IoGridOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";

const Starred = ({ darkMode, items = [] }) => {  // Default value for items
  const [gridView, setGridView] = useState(false);
  const [starredItems, setStarredItems] = useState([]);

  // Update starredItems whenever items change
  useEffect(() => {
    if (items && Array.isArray(items)) {
      setStarredItems(items.filter(item => item.isStarred));
    }
  }, [items]);

  const handleToggleGrid = () => {
    setGridView(true);
  };

  const handleToggleFlex = () => {
    setGridView(false);
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='flex w-full mt-5 items-center justify-between ml-7'>
        <h1 className='ml-5 text-xl'>Starred</h1>
        <div className={`flex w-[100px] mr-[100px] ${darkMode ? 'dark-mode3' : 'light-mode3'} border p-1 items-center rounded-full`}>
          <div onClick={handleToggleFlex} className='ml-1 flex items-center w-full border-r border-black'>
            {!gridView ? <TiTick /> : ''}<FaBars size={20} />
          </div>
          <div onClick={handleToggleGrid} className='justify-center flex items-center w-full mr-2'>
            {gridView ? <TiTick /> : ''}<IoGridOutline size={20} />
          </div>
        </div>
      </div>
      <div className={`items-container ${gridView ? 'grid-view' : 'flex-view'}`}>
        {starredItems.length > 0 ? (
          starredItems.map(item => (
            <div key={item.id} className='item'>
              <span>{item.name}</span>
            </div>
          ))
        ) : (
          <div className='no-items'>
            <img src='/src/assets/star.png' alt='No Starred Files' className='w-[300px] h-[300px]' />
            <h1 className='text-xl mb-5'>No starred files!</h1>
            <h1 className='text-sm'>Add stars to things you want to easily find later.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Starred;




