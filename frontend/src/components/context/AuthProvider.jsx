import React, { createContext, useContext, useState, useEffect } from 'react';

// Student Auth Context
const AuthContext = createContext();

// Custom hook to use the student context
export const useAuth = () => useContext(AuthContext);

// Provider component for student authentication
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("token");
        return !!token; // Returns true if token exists, false otherwise
    });

    const login = (token, student) => {
        setIsAuthenticated(true);
        localStorage.setItem("token", token); // Store the student token
        localStorage.setItem("studentData", JSON.stringify(student)); // Store student data
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token"); // Clear the student token
        localStorage.removeItem("studentData"); // Clear the student data
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // Update state based on token presence
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Faculty Auth Context
const FacultyAuthContext = createContext();

// Custom hook to use the faculty context
export const useFacultyAuth = () => useContext(FacultyAuthContext);

// Provider component for faculty authentication
export const FacultyAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("facultyToken");
        return !!token; // Returns true if token exists, false otherwise
    });

    const login = (token, facultyData) => {
        setIsAuthenticated(true);
        localStorage.setItem("facultyToken", token); // Ensure this line is reached
        localStorage.setItem("facultyData", JSON.stringify(facultyData)); // And this too
    };
    

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("facultyToken"); // Clear the faculty token
        localStorage.removeItem("facultyData"); // Clear the faculty data
        localStorage.removeItem("facultyEmail");
        localStorage.removeItem("facultyName");
    };

    useEffect(() => {
        const token = localStorage.getItem("facultyToken");
        setIsAuthenticated(!!token); // This should correctly update the state
    }, []);
    

    return (
        <FacultyAuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </FacultyAuthContext.Provider>
    );
};
