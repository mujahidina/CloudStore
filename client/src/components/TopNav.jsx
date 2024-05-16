import React, { useState, useEffect } from 'react'
import { IoIosSearch } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
const TopNav = ({darkMode, toggleMode, handleLogout}) => {

const [profile, setProfile] = useState(null);
const userId=sessionStorage.getItem('userId');
const [userProfile, setUserProfile]=useState(false)
const token=sessionStorage.getItem('token')

  const toggleProfile=()=>{
    setUserProfile(!userProfile)
  }
 
 

  useEffect(() => {
    // if (!myid) return;

    fetch(`http://127.0.0.1:5555/users/${userId}`)

      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setProfile(data);
      })
     .catch(err => {
        console.log(err);
      });
  }, [userId]);

  const navigate = useNavigate();

  //user profile end


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
      
      <div onClick={toggleProfile} className={`ml-[100px] cursor-pointer shadow-sm mt-3 border rounded-lg p-3 w-[190px] flex items-center justify-center ${darkMode ? 'dark-mode3' : 'light-mode'}`}>
      <button className='flex ' >
      {profile && <h1 className='flex w-full items-center'>{profile.email} <CgProfile size={25} className='ml-3' /></h1>} 
      </button>
    </div>
    {userProfile ? <div className={`flex flex-col w-[300px] h-[310px] absolute top-[100px] left-[950px]  shadow-sm border rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode3'} p-3`}>
       <div className='w-full items-center justify-center flex'><CgProfile size={80}  /></div>
       <div className='w-full items-center justify-center flex mt-3 text-2xl'>Hi Felix!</div>
       <div className='flex w-full items-center justify-center mt-2'></div>
       <div className='flex w-full items-center justify-center mt-5'><button className='border rounded-full p-2 w-[200px] '>Edit your Details</button></div>
       <div className='flex w-full items-center justify-center mt-6'><button onClick={handleLogout} className='border  rounded-full  p-1 w-[140px]'><span className='flex w-full items-center justify-center'><FiLogOut size={20} className='mr-3'/>Sign Out</span></button></div>
      </div> : ""}
    
      
    </div>
  )
}

export default TopNav
