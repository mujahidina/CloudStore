import {React, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"





const Profile = ({myid}) => {
const[profile, setProfile]=useState([])

useEffect(()=>{
  fetch (`http://127.0.0.1:5555/users/${myid}`)
.then(response=>response.json())
.then(data=>{
  console.log(data)
  setProfile(data)
})
// .catch(error=>{console.error('error fetching profile', error)})
},[myid])
    const navigate = useNavigate()
    // const token= sessionStorage.getItem('token')
    

    // const handleLogout=()=>{
    //     sessionStorage.clear()
    //     navigate('/')
    // }
    
  return (
    <div className='ml-[210px] cursor-pointer shadow-sm mt-3 border rounded-lg p-3 w-[160px] flex items-center justify-center'>
        <h1 className='text-red-400'>{profile.email}</h1>
    </div>
  )
}

export default Profile