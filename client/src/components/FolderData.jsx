import React, { useEffect, useState } from 'react';
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";

const FolderData = ({ handleUpload, fileUrl }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]); // Changed to an array
    const userId = sessionStorage.getItem('userId');
    const folderId = useParams().folderid;

    const handleFileUpload = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:5555/files`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                path: fileUrl,
                filename: '',
                file_type: '',
                size: '',
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
            setUploadedFiles([...uploadedFiles, data]); // Add the newly uploaded file to the array
        })
        .catch(err => {
            console.error('Error uploading file:', err);
        });
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/filefolder/${folderId}`)
        .then(resp => resp.json())
        .then(data => {
            console.log('my files.............', data);
            setUploadedFiles(data); // Set the fetched files to the uploadedFiles array
        });
    }, [folderId]);

    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex w-full items-center justify-between h-[100px]'>
                <div className='ml-9'><h1 className='text-2xl'>Voila! My Files.</h1></div>
                <form onSubmit={handleFileUpload} className='flex'>
                    <div onClick={handleUpload} className='mr-5 border justify-center p-1 rounded-full flex items-center w-full'>
                        <button className='flex items-center w-[107px]'><IoAdd size={20} className='mr-1'/>Upload File</button>
                        <input type='text' placeholder='upload file' className="hidden"/>   
                    </div>
                    <button className='mr-8 flex w-[100px] justify-center items-center p-1 border rounded-full' onClick={handleFileUpload}>Save</button> 
                </form>
            </div>

            <div>
                {uploadedFiles.map((file, index) => ( // Fixed mapping over uploadedFiles
                    <div key={index}>{file.path}</div>
                ))}
            </div>
        </div>
    );
}

export default FolderData;
