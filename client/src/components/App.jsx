import React, { useState } from 'react';
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

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(prevMode => !prevMode);
  }

  return (
    <Router>
      <div className={`grid grid-cols-5 gap-4 w-full h-screen ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className='w-[180px] ml-3'>
          <SideNav darkMode={darkMode} toggleMode={toggleMode}/>
        </div>
        <div className='grid grid-cols-1 col-span-4 w-full h-screen gap-4'>
          <div>
            <TopNav darkMode={darkMode} toggleMode={toggleMode}/>
          </div>
          <div className={` rounded-xl  h-[550px] ${darkMode ? 'dark-mode2' : 'light-mode2'}  mr-7 flex items-center justify-center`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recent" element={<Recent />} />
              <Route path="/search" element={<SearchBar />} />
              <Route path="/trash" element={<Trash />} />
              <Route path="/storage" element={<Storage />} />
              <Route path="/starred" element={<Starred />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/shared" element={<Shared/>} />
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
