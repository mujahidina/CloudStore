import React, { useState, useEffect } from 'react';
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const TopNav = ({ darkMode, toggleMode, handleLogout, handleUpload }) => {
  const [profile, setProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(false);
  const [userProfileData, setUserProfileData] = useState(null);
  const [search, setSearch] = useState("");

  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  const toggleProfile = () => {
    setUserProfile(!userProfile);
  }

  const closeButton = () => {
    setUserProfile(false);
  }

  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:5555/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then(data => {
        setProfile(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userId]);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className='flex w-full gap-5 items-center'>
      <form className={`flex items-center mt-3 text-lg shadow-sm p-3 ${darkMode ? 'dark-mode3' : 'light-mode3'} rounded-full w-[600px]`}>
        <IoIosSearch size={20} className='ml-3' />
        <input 
          type='text' 
          onChange={handleSearch} 
          value={search} 
          placeholder='Search in drive' 
          className={`outline-none ml-5 ${darkMode ? 'dark-mode3' : 'light-mode3'}`} 
        />
      </form>
      <button className='flex items-center justify-center mt-3 ml-12' onClick={toggleMode}>
        {darkMode ? <CiLight size={25} /> : <MdDarkMode size={25} />}
      </button>
      
      <div onClick={toggleProfile} className={`ml-[65px] h-[50px] cursor-pointer shadow-sm mt-3 border rounded-lg p-3 w-[230px] flex items-center justify-center ${darkMode ? 'dark-mode3' : 'light-mode'}`}>
        <button className='flex '>

          {profile && profile.image_url ? (
            <div className='flex items-center'>
             <h1 className='mr-2'>{profile.email}</h1> 
            <img src={profile.image_url} alt="Profile" className='rounded-full w-[40px] h-[40px]' />
            </div>
          ) : (
            <CgProfile size={25} className='ml-3' />
          )}
        </button>
      </div>

      {userProfile && (
        <div className={`flex flex-col w-[300px] h-[350px] absolute top-[100px] left-[950px] shadow-sm border rounded-xl ${darkMode ? 'dark-mode3' : 'light-mode3'} p-3`}>
          <div className='w-full flex'>
            {profile && <h1 className='flex w-full items-center justify-center ml-7'>{profile.email}</h1>}
            <button onClick={closeButton}>
              <IoIosClose size={30} />
            </button>
          </div>
          <div className='flex w-full items-center justify-center'>
            <h1 className='text-[10px]'>created and managed by CloudStore</h1>
          </div>
          <div className='flex w-full items-center justify-center mt-2' />
          {profile && profile.image_url ? (
            <img src={profile.image_url} alt="Profile" className='flex items-center ml-[90px] rounded-full w-[100px] h-[100px]' />
          ) : (
            <div className='w-full items-center mt-5 justify-center flex'>
              <CgProfile onClick={handleUpload} className='cursor-pointer' size={80} />
            </div>
          )}
          <div className='w-full items-center justify-center flex mt-3 text-2xl'>Hi {profile && profile.username}!</div>
          <div className='flex w-full items-center justify-center mt-2' />
          <div className='flex w-full items-center justify-center mt-1'>
            <Link to='/profile'>
              <button onClick={closeButton} className='border rounded-full p-2 w-[200px]'>Edit your Details</button>
            </Link>
          </div>
          <div className='flex w-full items-center justify-center mt-2'>
            <button onClick={handleLogout} className='border rounded-full p-1 w-[140px]'>
              <span className='flex w-full items-center justify-center'>
                <FiLogOut size={20} className='mr-3' />Sign Out
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopNav;
