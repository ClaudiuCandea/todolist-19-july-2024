import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

function GoogleLogin() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem('profile');
        return savedProfile ? JSON.parse(savedProfile) : null;
    });
    const { login, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogin =  useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            login();
            // TODO! If it navigates, the profile is not set in local storage!
            // navigate('/home');
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    localStorage.setItem('profile', JSON.stringify(res.data));
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        setProfile(null);
        logout();
        localStorage.removeItem('profile');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-700">
            <div className="max-w-md w-full p-4">
                {profile ? (
                    <div className="p-4 shadow rounded-lg bg-white">
                        <img src={profile.picture} alt="user image" className="w-24 h-24 rounded-full mx-auto" />
                        <h3 className="text-lg font-semibold text-center mt-2">User Logged in</h3>
                        <p className="mt-2"><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email Address:</strong> {profile.email}</p>
                        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150 ease-in-out w-full">Log out</button>
                        <Link to="/home" className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150 ease-in-out w-full">Plceholder To Home</Link>
                    </div>
                ) : (
                    <div className="p-4 shadow rounded-lg ">
                        <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out w-full">Sign in with Google 🚀</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GoogleLogin;