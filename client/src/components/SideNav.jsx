import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import { IoHome, IoPeople } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosCloud } from "react-icons/io";
import New from './New';
import drive from './public/drive.png'




const SideNav = ({darkMode, toggleMode , handleUpload}) => {
  const [newItem, setNewItem] = useState(false);
  const [bar, setBar]=useState(false)
  const toggleNew = () => {
   setNewItem(!newItem);
  }
  const toggleBar=()=>{
    setBar(!bar)
  }
  return (
    <div className='flex fixed ml-3 flex-col items-center w-[200px]'>
      <div className='flex items-center justify-start w-full  text-xl mt-3'>
        <img src={drive} className='w-11 mr-3 h-11'/>
      <h1>
        CloudStore
      </h1>
      </div>
      <div className='flex flex-col w-full items-center justify-start'>
        <button onClick={toggleNew} className={`flex  items-center mt-4 justify-start ${darkMode ? 'dark-mode3' : 'light-mode2'} rounded-2xl w-[111px] p-4 shadow-md`}><FaPlus size={20} className='mr-4'
        /> New</button>
        {newItem ? <div className={` w-[230px] ${darkMode ? 'dark-mode3' : 'light-mode3'} ml-11 shadow-md mt-[100px] p-4 absolute rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode2'} h-[110px] flex justify-center `}>
          <New toggleBar={toggleBar} handleUpload={handleUpload}/></div> : ""}
       
      </div>
      <div className='flex items-center  h-screen mt-6  justify-start flex-col gap-8 w-full'>
        <div className='w-full flex gap-6 flex-col'>
         <div className=' justify-start w-full '><Link className='navbar p-3 flex cursor-pointer items-center' to="/"><IoHome size={20} className='mr-4 '/>Home</Link></div> 
         <div className='justify-start w-full '><Link className="navbar p-3 flex cursor-pointer items-center" to="/shared"><MdPeopleAlt size={20} className='mr-4 '/>Shared with me</Link></div> 
         <div className='justify-start w-full '><Link className="navbar p-3 flex cursor-pointer items-center" to="/recent"><CiClock2 size={20} className='mr-4 '/>Recent</Link></div> 

         <div className='justify-start w-full '><Link className="navbar p-3 flex cursor-pointer items-center" to="/room"><IoPeople size={20} className='mr-4 '/>Rooms</Link></div> 
        
        
         
         <div className='justify-start w-full '><Link className='navbar p-3 flex cursor-pointer items-center' to="/starred"><FaRegStar size={20} className='mr-4'/>Starred</Link></div> 
         
        
         <div className='justify-start w-full '><Link className=" navbar p-3 flex cursor-pointer items-center" to="/trash"><FaRegTrashAlt size={20} className='mr-4'/>Trash</Link></div> 
         <div className='justify-start w-full '><Link className=" navbar p-3 flex cursor-pointer items-center" to="/storage"><IoIosCloud size={20} className='mr-4'/>Storage</Link></div> 
         </div>
      </div>

    </div>
  )
}

export default SideNav