import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import Profile from './Profile';



const TopNav = ({darkMode, toggleMode}) => {
  const[search, setSearch]=useState("")
  const HandleSearch =(e)=>{
    setSearch(e.target.value)
  }
  return (
    <div className='flex w-full gap-5 items-center '>
      <form className={`flex items-center  mt-3 text-lg shadow-sm p-3 ${darkMode ? 'dark-mode3' : 'light-mode3'} rounded-full w-[600px]`}>
      <IoIosSearch  size={20} className='ml-3'/>
      <input type='text' onChange={HandleSearch} value={search} placeholder='Search in drive' className={`outline-none  ml-5 ${darkMode ? 'dark-mode3' : 'light-mode3'}`} />
      </form>
      <button className='flex items-center justify-center mt-3 ml-12' onClick={toggleMode}>
        {darkMode ? <CiLight size={25}/>: <MdDarkMode size={25}/>}
        
        
      </button>

      <div className='ml-[110px] cursor-pointer shadow-sm mt-3 border rounded-lg p-3 w-[160px] flex items-center justify-center'>
        <Profile />
      </div>
      
    </div>
  )
}

export default TopNav
