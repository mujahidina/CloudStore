import React from 'react'
import { IoMdFolderOpen } from "react-icons/io";
import { FaRegFileLines } from "react-icons/fa6";

const New = () => {
  return (
    <div>
      <div className='flex cursor-pointer w-full items-center p-3'><IoMdFolderOpen size={20} className='mr-4 '/> Folder</div>
      <div className='flex cursor-pointer w-full items-center p-3'><FaRegFileLines size={20} className='mr-4 '/>File upload</div>
      <div className='flex cursor-pointer w-full items-center p-3'><IoMdFolderOpen size={20} className='mr-4 '/> Folder upload</div>
      
    </div>
  )
}

export default New