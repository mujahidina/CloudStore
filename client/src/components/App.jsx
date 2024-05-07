import React from 'react';
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

const App = () => {
  return (
    <Router>
      <div  className='grid grid-cols-5 gap-4 w-full h-screen '>
        <div className='w-[140px] ml-3'>
        <SideNav />
        </div>
        <div className='grid grid-cols-1 col-span-4 w-full h-screen gap-4 '>
          <div>
            <TopNav />
          </div>
      <div className='bg-gray-300 rounded-lg h-[550px]  mr-7'>
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
        </Routes>
        </div>
        </div>
        </div>
    </Router>
  );
};

export default App;
