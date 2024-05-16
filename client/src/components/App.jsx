import React, { useEffect, useState } from 'react';
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
import Shared from './Shared'
import Auth from './Auth'
import Signup from './Signup';
import Login from './Login';
// import { useNavigate } from "react-router-dom";




const App = () => {
 
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token= sessionStorage.getItem('token');
  const userId=sessionStorage.getItem('userId');
  console.log('this is my user id', userId)

  const handleLogout=()=>{
   sessionStorage.removeItem('token')
   sessionStorage.removeItem('userId')
    setIsAuthenticated(false)

  }

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      console.log('token is set', token)
      
    }
    else{
      console.log('token is not set')
      setIsAuthenticated(false)
    }
  }, [token]);
  
  

  
  
  
  const toggleMode = () => {
    setDarkMode(prevMode => !prevMode);
  }
  
  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  }
  const handleLogin = (newToken) => {
    setToken(newToken);
  }

  return (
    <Router>
      {isAuthenticated ?  
        <div className={`grid grid-cols-5 fixed  gap-4 w-full h-screen ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          <div className='w-[180px] ml-3'>
            <SideNav  darkMode={darkMode} toggleMode={toggleMode}/>
          </div>
          <div className='grid grid-cols-1 col-span-4 w-full h-screen gap-4'>
            <div>
              <TopNav darkMode={darkMode} handleLogout={handleLogout} toggleMode={toggleMode}/>
            </div>
            <div className={`rounded-xl h-[530px] ${darkMode ? 'dark-mode2' : 'light-mode2'} mr-7 flex items-center justify-center`}>
              <Routes>
                <Route path="/" element={<Home darkMode={darkMode} toggleMode={toggleMode}/>} />
                <Route path="/new" element={<New darkMode={darkMode} toggleMode={toggleMode}/>} />
                <Route path="/profile" element={<Profile  userId={userId} />} />
                <Route path="/recent" element={<Recent />} />
                <Route path="/search" element={<SearchBar />} />
                <Route path="/trash" element={<Trash darkMode={darkMode} toggleMode={toggleMode}/>} />
                <Route path="/storage" element={<Storage />} />
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
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            <Route path='/login' element={<Login  handleAuth={handleAuth}  />} /> {/* Pass handleAuth as a prop */}
          </Routes>
        </div>
      }
    </Router>
  );
};

export default App;
