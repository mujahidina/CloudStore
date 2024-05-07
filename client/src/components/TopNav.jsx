import React from 'react'
// import { CiLight } from "react-icons/ci";

// import { MdDarkMode } from "react-icons/md";

const TopNav = ({darkMode, toggleMode}) => {
  return (
    <div>
      <button onClick={toggleMode}>
        {darkMode ? "light" : "dark"}
      </button>
    </div>
  )
}

export default TopNav