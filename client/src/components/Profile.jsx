import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";

const Profile = ({ darkMode, toggleMode, handleUpload, ImageUrl }) => {
  const [profile, setProfile] = useState(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const [imageUpload, setImageUpload] = useState(false);

  const handleImageUpload = () => {
    fetch(`http://127.0.0.1:5555/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: ImageUrl,
      })
    })
    .then(response => response.json())
    .then(data => {
      setProfile(prevProfile => ({ ...prevProfile, image_url: data.image_url }));
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  };

  useEffect(() => {
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

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const startEditingEmail = () => {
    setIsEditingEmail(true);
  };

  const handleSaveChanges = () => {
    fetch(`http://127.0.0.1:5555/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: editedEmail })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update email');
      }
      return response.json();
    })
    .then(data => {
      setProfile(prevProfile => ({
        ...prevProfile,
        email: editedEmail
      }));
      setIsEditingEmail(false);
    })
    .catch(err => {
      console.error('Error updating email:', err);
    });
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex w-full mt-11 h-[30px] items-center'>
        <h1 className='text-center text-2xl'>Edit your details to meet your preference</h1>
      </div>
      <div className={`flex flex-col w-[400px] h-[400px] mt-6 ${darkMode ? 'dark-mode3' : 'light-mode3'} rounded-xl`}>
        
        <div className='w-full items-center mt-5 justify-center flex'>
          {profile && profile.image_url ? (
            <img src={profile.image_url} alt="Profile" className='w-[100px] h-[100px] rounded-full' />
          ) : (
            <CgProfile className='cursor-pointer' size={80} />
          )}
        </div>
        
        <form className='flex w-full items-center justify-center'>
          <div onClick={handleUpload} className='flex w-[125px] rounded-full'>
            <input
              type='text'
              placeholder='Upload image'
              className='w-full h-full mt-5 rounded-full p-2 ml-2 justify-center outline-none cursor-pointer flex items-center'
            />
          </div>
          <button className='p-1 flex items-center justify-center' onClick={handleImageUpload}>Save</button>
        </form>
        
        <div className='w-full items-center justify-center flex mt-3 text-2xl'>Hi {profile && profile.username}!</div>
        
        {isEditingEmail ? (
          <div className='flex w-full mt-5 justify-center items-center'>
            <input
              type="email"
              value={editedEmail}
              onChange={handleEmailChange}
              className='w-[200px] p-2 border outline-none rounded-lg'
            />
          </div>
        ) : (
          <div className='flex w-full mt-5 justify-center items-center cursor-pointer' onClick={startEditingEmail}>
            <div>{profile && profile.email}</div>
          </div>
        )}
        
        <div className='flex w-full items-center justify-center mt-1'>
          <button onClick={handleSaveChanges} className='border rounded-full p-2 w-[150px]'>Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
