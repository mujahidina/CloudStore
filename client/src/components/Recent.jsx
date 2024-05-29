import React, { useState, useEffect } from 'react';

const userId = sessionStorage.getItem('userId');

function Recent({ darkMode }) {
  const [files, setFiles] = useState([]);
  const [sortedFiles, setSortedFiles] = useState([]);

  useEffect(() => {

const url = `https://cloudstorebackend.onrender.com/fileuser/${userId}`;
console.log('Fetch URL:', url);

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('Fetched files:', data);
    setFiles(data);
    setSortedFiles(data)
  })
  .catch((error) => {
    console.error('Fetch error:', error.message);
  });
  }, [userId]);

  const sortFilesByDate = () => {
    const sorted = [...files].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setSortedFiles(sorted);
  };

  const categorizeByMonth = (files) => {
    const categorized = files.reduce((acc, file) => {
      const month = new Date(file.created_at).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!acc[month]) acc[month] = [];
      acc[month].push(file);
      return acc;
    }, {});
    return categorized;
  };

  const categorizedFiles = categorizeByMonth(sortedFiles);

  return (
    <div className={`container w-full rounded-xl h-full flex flex-col ${darkMode ? 'dark-mode3' : 'light-mode2'}`}>
      <div className='text-2xl m-3'>
        Recent Files
      </div>
      <div className='flex justify-between m-3'>
        <button onClick={sortFilesByDate} className="btn btn-primary">Sort by Recently Created</button>
      </div>
      <div className='flex overflow-y-auto flex-col w-full h-full ml-7 mt-5'>
        {Object.keys(categorizedFiles).map((month, index) => (
          <div key={index}>
            <br />
            <h3>{month}</h3>
            <br />
            <div>
              {categorizedFiles[month].map((file, idx) => (
                <div key={file.id || file.file_id} className='flex flex-col items-center'>
                  <div className='flex p-2 w-full justify-between items-center'>
                    <img src={file.path || file.file.path || '/src/assets/file.png'} className='w-[30px] rounded-full h-[30px]' alt={file.filename || file.file.filename} />
                    <h1 className='ml-[30px]'>{file.filename || file.file.filename}</h1>
                    <h1 className='ml-[80px]'>{new Date(file.created_at).toLocaleString()}</h1>
                    <h1 className='mr-[80px]'>{file.user.username}</h1>
                  </div>
                  <div className='w-full mr-[140px] flex'><hr className='w-full' /></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recent;