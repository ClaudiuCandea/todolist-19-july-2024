import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

function GoogleLogin() {
    const [user, setUser] = useState(null);
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleLogin =  useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            login();
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const fetchUserProfile = (accessToken) => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                localStorage.setItem('profile', JSON.stringify(res.data));
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (user) {
            fetchUserProfile(user.access_token);
        }
    }, [user, navigate]);


    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-700">
            <div className="max-w-md w-full p-4">
                <div className="p-4 shadow rounded-lg ">
                    <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out w-full">Sign in with Google 🚀</button>
                </div>
            </div>
        </div>
    );
}

export default GoogleLogin;