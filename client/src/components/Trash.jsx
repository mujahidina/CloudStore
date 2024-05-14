//Components:
//1. DeletedFiles:
 //Description: Displays a list of deleted files.
//Functionality:
 // - Upon rendering, fetches deleted files from the backend.
  //- Displays the list of deleted files with a "Restore" button next to each file.
  //- When the "Restore" button is clicked, the corresponding file is restored.

//2. RestoreFile:
//- Description: Provides a form for restoring a file.
//- Functionality:
  //- Allows the user to enter the file name in a text input field.
  //- When the form is submitted, triggers a restore action for the specified file.

//3. SearchFiles:
//- Description: Enables users to search for files.
//- Functionality:
  //- Provides a search input field where users can enter search terms.
  //- When the user enters a search term and submits the form:
    //- Sends a request to the backend with the search term.
    //- Receives search results from the backend.
    //- Displays the search results in a list format.

//Usage:
//- Users can navigate to the "Deleted Files" section to view a list of files that have been deleted.
//- In the "Deleted Files" section, users can click the "Restore" button next to each file to restore it.
//- Users can navigate to the "Restore File" section to restore a specific file by entering its name in the provided form.
//- Users can use the "Search Files" section to search for files by entering keywords in the search input field.

import React, { useState, useEffect } from 'react';

const DeletedFiles = () => {
    const [deletedFiles, setDeletedFiles] = useState([]);

    useEffect(() => {
        // Fetch deleted files from the backend
        const fetchDeletedFiles = async () => {
            try {
                const response = await fetch('/api/deleted_files');
                const data = await response.json();
                setDeletedFiles(data.deletedFiles);
            } catch (error) {
                console.error('Error fetching deleted files:', error);
            }
        };

        fetchDeletedFiles();
    }, []);

    const handleRestore = (fileId) => {
        // Implement restore functionality here
    };

    return (
        <div>
            <h2>Deleted Files</h2>
            <ul>
                {deletedFiles.map(file => (
                    <li key={file.id}>
                        {file.name} <button onClick={() => handleRestore(file.id)}>Restore</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const SearchFiles = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/search?query=${searchTerm}`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error searching files:', error);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <h2>Search Files</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
                <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search files..." style={{ flex: '1', marginRight: '10px', padding: '5px', color: 'black' }} />
                <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Search</button>
            </form>
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchFiles;
