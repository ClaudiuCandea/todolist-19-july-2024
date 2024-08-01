import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
        return storedIsAuthenticated !== null
            ? JSON.parse(storedIsAuthenticated)
            : false;
    });

    const [profile, setProfile] = useState(() => {
        const storedProfile = localStorage.getItem("profile");
        return storedProfile !== null ? JSON.parse(storedProfile) : null;
    });

    useEffect(() => {
        localStorage.setItem(
            "isAuthenticated",
            JSON.stringify(isAuthenticated)
        );
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem("profile", JSON.stringify(profile));
    }, [profile]);

    return {
        ...context,
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
    };
};
