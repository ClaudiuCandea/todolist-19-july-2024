import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function GoogleLogin() {
    const [user, setUser] = useState(null);
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            login();
        },
        onError: (error) => console.log("Login Failed:", error),
    });

    const fetchUserProfile = (accessToken) => {
        axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        Accept: "application/json",
                    },
                }
            )
            .then((res) => {
                localStorage.setItem("profile", JSON.stringify(res.data));
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const handleCreateAccount = () => {
        const link = document.createElement("a");
        link.href = "https://accounts.google.com/signup";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
    };

    useEffect(() => {
        if (user) {
            fetchUserProfile(user.access_token);
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-200 dark:bg-gray-900 text-black dark:text-white">
            <div className="w-10/12 max-w-xl p-6 rounded-lg shadow-xl bg-zinc-300 dark:bg-gray-900 text-black dark:text-white">
                <div className="text-center mb-4">
                    <img
                        src="/682665_favicon_google_logo_new_icon.ico"
                        alt="Google logo"
                        className="w-24 h-24 mx-auto rounded-full"
                    />
                    <h1 className="text-2xl font-bold text-black dark:text-white">
                        Sign in with Google
                    </h1>
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    Sign in
                </button>
                <button
                    onClick={handleCreateAccount}
                    className="w-full bg-transparent dark:hover:bg-gray-700 hover:bg-zinc-300 text-black dark:text-white font-bold py-2 px-4 rounded-full mt-4"
                >
                    Create Account
                </button>
            </div>
        </div>
    );
}

export default GoogleLogin;
