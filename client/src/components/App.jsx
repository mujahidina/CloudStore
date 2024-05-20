import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
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

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  console.log('this is my user id', userId);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dnowgdk4r',
      uploadPreset: 'yqanaohn'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('File uploaded successfully: ', result.info);
        thenUpload(result.info); 
      }
    });
  }, []);

  const handleUpload = () => {
    widgetRef.current.open();
  };

  const thenUpload = (fileInfo) => {
    fetch('http://127.0.0.1:5555/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: fileInfo.secure_url,
        public_id: fileInfo.public_id,
        user_id: userId 
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Item submitted', data);
    })
    .catch(error => {
      console.error('Error submitting file', error);
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      console.log('Token is set', token);
    } else {
      console.log('Token is not set');
      setIsAuthenticated(false);
    }
  }, [token]);

  const toggleMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <Router>
      {isAuthenticated ?  
        <div className={`grid grid-cols-5 fixed  gap-4 w-full h-full ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          <div className='w-[180px]   ml-3'>
            <SideNav  darkMode={darkMode} handleUpload={handleUpload} toggleMode={toggleMode} />
          </div>
          <div className='grid grid-cols-1 col-span-4 w-full h-screen gap-4'>
            <div>
              <TopNav darkMode={darkMode} handleUpload={handleUpload} handleLogout={handleLogout} toggleMode={toggleMode} />
            </div>
            <div className={`rounded-xl  h-[530px] ${darkMode ? 'dark-mode2' : 'light-mode2'} mr-7 flex items-center justify-center`}>
              <Routes>
                <Route path="/" element={<Home darkMode={darkMode} toggleMode={toggleMode}/>} />
                <Route path="/new" element={<New darkMode={darkMode} handleUpload={handleUpload} toggleMode={toggleMode}/>} />
                <Route path="/profile" element={<Profile userId={userId} darkMode={darkMode} toggleMode={toggleMode}/>} />
                <Route path="/recent" element={<Recent />} />
                <Route path="/search" element={<SearchBar />} />
                <Route path="/trash" element={<Trash darkMode={darkMode} handleUpload={handleUpload} toggleMode={toggleMode}/>} />
                <Route path="/storage" element={<Storage handleUpload={handleUpload}/>} />
                <Route path="/starred" element={<Starred darkMode={darkMode} toggleMode={toggleMode}/>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/shared" element={<Shared />} />
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
