
import React, { useEffect, useState } from 'react';
import { TiTick } from "react-icons/ti";
import { IoGridOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";


const Trash = ({darkMode}) => {
  const [gridView, setGridView] = useState(false);
  const [flexView, setFlexView] = useState(true);

  const handleToggleGrid = () => {
    setGridView(prevMode => !prevMode);
    setFlexView(false);
  };

  const handleToggleFlex = () => {
    setFlexView(prevMode => !prevMode);
    setGridView(false);
  };

  return (
    <div className=' w-full h-full flex flex-col items-center justify-center'>
       <div className='flex w-full mt-5 items-center justify-between ml-7'><h1 className=' ml-5 text-xl'>Trash</h1>
        <div className={`flex w-[100px] mr-[100px] ${darkMode ? 'dark-mode3' : 'light-mode3'} border p-1 items-center rounded-full`}>
          <div onClick={handleToggleFlex} className='ml-1 flex items-center w-full border-r border-black'>
            {flexView ? <TiTick /> : ''}<FaBars size={20}/>
          </div>
          <div onClick={handleToggleGrid} className='justify-center flex items-center w-full mr-2'>
            {gridView ? <TiTick /> : ''}<IoGridOutline size={20}/>
          </div>
          </div>
          </div>
      <div>
        <img src='/src/assets/trash.png ' className='w-[300px] h-[300px]'/>
      </div>
      <div className='flex flex-col w-full mt-5 items-center justify-center'>
        <h1 className='text-xl mb-5'>Nothing in Trash!</h1>
        <h1 className='text-sm'>Move items you don't need to trash. Once you delete theme here,</h1>
        <h1 className='text-sm'>They'll be gone for good!</h1>
      </div>

    </div>
   
  )
}

export default Trash
