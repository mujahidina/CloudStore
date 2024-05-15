import {React} from 'react'
import {useNavigate} from "react-router-dom"



const Profile = () => {
    const navigate = useNavigate()
    // const token= sessionStorage.getItem('token')

    const handleLogout=()=>{
        sessionStorage.clear()
        navigate('/')
    }
    
  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile