import React from 'react'



const TopNav = ({darkMode, toggleMode}) => {
  return (
    <div>
      <button onClick={toggleMode}>
        {darkMode ? "light": "dark"}
        
      </button>
      
    </div>
  )
}

export default TopNav
