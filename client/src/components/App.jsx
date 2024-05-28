import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; 
import Recent from './Recent';
import SearchBar from './SearchBar';
import Trash from './Trash';
import Starred from './Starred';
import Settings from './Settings';
import Profile from './Profile';
import New from './New';
import Home from './Home';
import Storage from './Storage';
import SideNav from './SideNav';
import TopNav from './TopNav';
import Shared from './Shared';
import Auth from './Auth';
import Signup from './Signup';
import Login from './Login';
import FolderData from './FolderData';
import Shares from './Shares';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [cloudinaryRes, setCloudinaryRes] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const userId=sessionStorage.getItem('userId')

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dnowgdk4r',
      uploadPreset: 'yqanaohn'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('File uploaded successfully: ', result.info);
        setCloudinaryRes(result.info);
        // thenUpload(result.info); // You need to define thenUpload function or remove this call if not needed
      }
    });
  }, []);

  //get email

  useEffect(() => {
    // Make an API call to fetch user's email based on userId
    fetch(`http://127.0.0.1:5555/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserEmail(data.email);
      })
      .catch(error => {
        console.error('Error fetching user email:', error);
      });
  }, [userId]);

  const handleUpload = () => {
    widgetRef.current.open();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    if (token && userId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const toggleMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated ?  
        <div className={`grid grid-cols-5 fixed gap-4 w-full h-full ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          <div className='w-[180px] ml-3'>
            <SideNav darkMode={darkMode} handleUpload={handleUpload} toggleMode={toggleMode} />
          </div>
          <div className='grid grid-cols-1 col-span-4 w-full h-screen gap-4'>
            <div>
              <TopNav darkMode={darkMode} handleUpload={handleUpload} handleLogout={handleLogout} toggleMode={toggleMode} />
            </div>
            <div className={`rounded-xl h-[530px] ${darkMode ? 'dark-mode2' : 'light-mode2'} mr-7 flex items-center justify-center`}>
              <Routes>
                <Route path="/" element={<Home darkMode={darkMode} toggleMode={toggleMode} handleUpload={handleUpload}/>} />
                <Route path="/new" element={<New darkMode={darkMode} handleUpload={handleUpload} toggleMode={toggleMode} fileUrl={cloudinaryRes}/>} />
                <Route path="/profile" element={<Profile userId={sessionStorage.getItem('userId')} darkMode={darkMode} handleUpload={handleUpload} toggleMode={toggleMode} ImageUrl={cloudinaryRes}/> } />
                <Route path="/recent" element={<Recent darkMode={darkMode} />} />
                <Route path='/share' element={<Shares darkMode={darkMode} />} />
                <Route path="/search" element={<SearchBar />} />
                <Route path="/trash" element={<Trash darkMode={darkMode} handleUpload={handleUpload} toggleMode={toggleMode}/>} />
                <Route path="/storage" element={<Storage handleUpload={handleUpload} darkMode={darkMode} />} />
                <Route path="/starred" element={<Starred darkMode={darkMode} toggleMode={toggleMode}/>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/shared" element={<Shared darkMode={darkMode} userEmail={userEmail}/>} />
                <Route path='/folderdata/:folderid' element={<FolderData handleUpload={handleUpload} darkMode={darkMode} toggleMode={toggleMode} fileUrl={cloudinaryRes} />} />
              </Routes>
            </div>
          </div>
        </div>
      : 
        <div>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/signup" element={<Signup handleAuth={handleAuth} />} />
            <Route path='/login' element={<Login handleAuth={handleAuth} />} />
          </Routes>
        </div>
      }
    </Router>
  );
};

export default App;
