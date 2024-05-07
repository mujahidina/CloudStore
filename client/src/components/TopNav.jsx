import React from 'react'



const TopNav = ({darkMode, toggleMode}) => {
  return (
    <div>
      <button onClick={toggleMode}>
        {darkMode ? <FontAwesomeIcon icon={faSun} />: "dark"}
        
      </button>
      
    </div>
  )
}

export default TopNav
