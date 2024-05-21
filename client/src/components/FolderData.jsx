import React, { useState } from 'react'
import { IoAdd } from "react-icons/io5";
import {useParams} from "react-router-dom";


const FolderData = ({handleUpload, fileUrl}) => {
    const [uploadedFile, setUploadedFile] = useState("");
    const userId=sessionStorage.getItem('userId')

    const folderId = useParams().folderid;
    console.log(folderId, "zsxdrgyuhjikolp;,.")
     
    const handleFileUpload = (e) => {
      e.preventDefault()
        fetch(`http://127.0.0.1:5555/files`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            path:fileUrl,
            filename:'',
            file_type:'',
            size:'',
            folder_id:folderId,
            user_id:userId,

           })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update file');
          }
          return response.json();
        })
        .then(data => {
        setUploadedFile(data.path)
        })
        .catch(err => {
          console.error('Error uploading file:', err);
        });
      };
  return (
    // <h1>sfdgyjhukilk</h1>
    <div>
        <button  className='flex items-center bg-slate-300 w-[200px]'><IoAdd size={20}className='mr-1'/>Upload File</button>
        <form onSubmit={handleFileUpload}>
          <div onClick={handleUpload}>
            <input  type='text'
            placeholder='upload file'/>

          </div>
          <button  onClick={handleFileUpload}> save</button>
        </form>
       
        
    </div>
  )
}

export default FolderData