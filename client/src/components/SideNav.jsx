import React from 'react'
import { Link } from 'react-router-dom'


const SideNav = ({darkMode, toggleMode}) => {
  return (
    <div className='flex ml-3 flex-col items-center w-full'>
      <div className='flex items-center justify-start w-full  text-xl mt-3'>
        <img src='src/assets/drive.png' className='w-11 mr-3 h-11'/>
      <h1>
        Drive
      </h1>
      </div>
      <div className='flex w-full items-center justify-start'>
        <button className={`flex items-center mt-4 justify-start ${darkMode ? 'dark-mode3' : 'light-mode2'} rounded-2xl w-[111px] p-4 `}>New</button>
      </div>
      <div className='flex items-center  h-screen mt-6 ml-9 justify-start flex-col gap-3 w-full'>
        <div className='w-full flex gap-2 flex-col'>
         <div className='flex cursor-pointer items-center justify-start w-full '><Link className='navbar p-1.5' to="/">Home</Link></div> 
         <div className='flex cursor-pointer items-center justify-start w-full '><Link className="navbar p-1.5" to="/">Shared with me</Link></div> 
         <div className='flex cursor-pointer items-center justify-start w-full '><Link className="navbar p-1.5" to="/">Recent</Link></div> 
         </div>
         <div className='flex w-full  flex-col mt-7'>
         <div className='flex cursor-pointer items-center justify-start w-full '><Link className='navbar p-1.5' to="/">Starred</Link></div> 
         </div>
         <div className='flex w-full flex-col gap-2 mt-4'>
         <div className='flex cursor-pointer items-center justify-start w-full '><Link className=" navbar p-1.5" to="/">Trash</Link></div> 
         <div className='flex cursor-pointer items-center justify-start w-full '><Link className=" navbar p-1.5" to="/">Storage</Link></div> 
         </div>
      </div>

    </div>
  )
}

export default SideNav