import React, { useEffect, useState } from 'react';

const Profile = ({ token }) => {
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5555/users/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching profile');
                }

                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        if (token) {
            fetchProfile();
        }
    }, [token]);

    return (
        <div>
            profile
        </div>
    );
};

export default Profile;
