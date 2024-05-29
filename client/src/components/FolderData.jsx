import React, { useEffect, useState } from 'react';
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";

const FolderData = ({ handleUpload, fileUrl, darkMode, toggleMode }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]); // Changed to an array
    const userId = sessionStorage.getItem('userId');
    const folderId = useParams().folderid;
    const [isEmpty, setIsEmpty] = useState(false);

    const handleFileUpload = (e) => {
        e.preventDefault();
        fetch(`https://cloudstorebackend.onrender.com/files`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                path: fileUrl.thumbnail_url,
                filename: fileUrl.original_filename,
                file_type: fileUrl.resource_type,
                size: fileUrl.bytes,
                folder_id: folderId,
                user_id: userId,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update file');
            }
            return response.json();
        })
        .then(data => {
            setUploadedFiles([...uploadedFiles, data]); 
        })
        .catch(err => {
            console.error('Error uploading file:', err);
        });
    };

    useEffect(() => {
        fetch(`https://cloudstorebackend.onrender.com/filefolder/${folderId}`)
        .then(resp => resp.json())
        .then(data => {
            console.log('my files.............', data);
            setUploadedFiles(data); 
        });
    }, [folderId]);

    useEffect(() => {
        setIsEmpty(uploadedFiles.length === 0); 
    }, [uploadedFiles]);

    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex w-full items-center justify-between h-[100px]'>
                <div className='ml-9'><h1 className='text-2xl'>Voila! My Files.</h1></div>
                <form onSubmit={handleFileUpload} className='flex'>
                    <div  onClick={handleUpload} className='mr-5 border justify-center p-1 rounded-full flex items-center w-full'>
                        <button className='flex items-center w-[107px]'><IoAdd size={20} className='mr-1'/>Upload File</button>
                        <input type='text' placeholder='upload file' className="hidden"/>   
                    </div>
                    <button className='mr-8 flex w-[100px] justify-center items-center p-1 border rounded-full' onClick={handleFileUpload}>Save</button> 
                </form>
            </div>
            {!isEmpty ? (
                <div  className='grid mt-6 overflow-y-auto   grid-cols-4 gap-5 ml-9 mr-9'>
                    {uploadedFiles.map((file, index) => ( 
                        <div key={index}  className={`flex flex-col object-cover overflow-hidden items-center rounded-lg h-[200px] ${darkMode ? 'dark-mode3' : 'light-mode3'}`}>
                            <div className='h-[130px] w-full'>
                                <img className='w-full  h-full' src={file.path} alt={file.filename} />
                            </div>
                            <h1 className='text-sm text-center'>{file.filename}</h1>
                            <hr className='flex w-full items-center'/>
                            <h1>{file.file_type}</h1>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex w-full items-center flex-col'>
                    <img src='/public/empty.png' className='w-[300px] h-[300px]' alt='No files' />
                    <h1 className='font-bold mt-7'>Nothing here yet!</h1>
                    <h1 className='text-sm'>Upload to view files specific to this folder.</h1>
                </div>
            )}
        </div>
    );
}

export default FolderData;
