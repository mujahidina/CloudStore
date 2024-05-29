// import React, { useState } from 'react'
import { HiBars3 } from "react-icons/hi2";
import { Link } from 'react-router-dom';



const Auth = () => {
  return (
    <div className='flex items-center  flex-col h-screen w-full bg-slate-100'>
      <div className='flex items-center  fixed  border-b-gray-500 bg-white shadow-md justify-start h-[70px] w-full   '><button></button><img src="./images/drive.png" alt=' drive logo' className='w-11 ml-7 h-11 '/><h1 className='text-xl text-gray-500'><span className='text-gray-600 hover:text-black'>Cloud</span>Store</h1></div>
      {/* <div className='w-full flex '><hr className='fle w-full'/></div> */}
      <div className=" w-[1000px] mt-[100px] h-[400px] shadow-md rounded-xl bg-white">
      <div className=' mt-[50px] flex items-center justify-center text-5xl'>
        
      <h1>Easy and secure access to your content</h1>
      </div>
      <div className='w-full mt-9 flex items-center justify-center text-xl'>
        <h1 >Store, share, and collaborate on files and folders from your mobile device, tablet, or computer</h1>
      </div>
      <div className='w-full mt-9  flex items-center gap-10 justify-center'>
      {/* <button className='flex items-center justify-center border rounded-md p-3 w-[200px] bg-[#2563eb] hover:bg-[#1d4ed8] text-lg text-white '>Try Drive For Work</button> */}
       <Link to='/login' target="blank"><button className='flex items-center justify-center border rounded-md p-3 w-[150px] text-lg text-[#2563eb] hover:border-[#2563eb] '>Get Started</button></Link>
      </div>

      <div className='flex items-center justify-center w-full mt-11'>
        <h1>Don't have an account?  <span className='ml-9 text-[#2563eb]'> <Link to='/signup'target="blank">Sign up at no cost</Link></span></h1>
      </div>
      </div>
    </div>
  )
}

export default Auth