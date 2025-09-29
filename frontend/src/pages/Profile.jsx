import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [loggedInUser, setloggedInUser] = useState('');
    const [loggedInUserEmail, setloggedInUserEmail] = useState('');
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        alert('User Loggedout');
        setTimeout(() => {
            navigate('/');
        }, 1000)
    }


    useEffect(() => {
        setloggedInUser(localStorage.getItem('loggedInUser'));
        setloggedInUserEmail(localStorage.getItem('loggedInUserEmail'));
    }, [])


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-green-50 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="p-6 text-center">
                    <h1 className="text-3xl font-bold text-purple-700 mb-1">{loggedInUser}</h1>
                    <h2 className="text-gray-600 text-sm mb-4">{loggedInUserEmail}</h2>
                    <p className="text-gray-500 mb-6 italic">Hello! {loggedInUser}</p>

                    <button
                        onClick={handleLogout}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full py-3 px-6 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile