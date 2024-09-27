import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; // Adjust import paths as necessary
import { useFacultyAuth } from '../context/AuthProvider'; // Import for Faculty
import { useAdminAuth } from '../context/AuthProvider'; // Import for Admin

const PrivateRoute = ({ children, role }) => {
    let isAuthenticated;

    // Determine which role's authentication context to use
    if (role === 'student') {
        const { isAuthenticated: studentAuth } = useAuth();
        isAuthenticated = studentAuth;
    } else if (role === 'faculty') {
        const { isAuthenticated: facultyAuth } = useFacultyAuth();
        isAuthenticated = facultyAuth;
    } else if (role === 'admin') {
        const { isAuthenticated: adminAuth } = useAdminAuth();
        isAuthenticated = adminAuth;
    }

    console.log(`${role} isAuthenticated:`, isAuthenticated);

    // Redirect unauthenticated users to the StudentForm page
    return isAuthenticated ? children : <Navigate to="/StudentForm" />;
};

export default PrivateRoute;
