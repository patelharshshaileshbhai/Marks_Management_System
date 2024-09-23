import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    console.log("PrivateRoute isAuthenticated:", isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/StudentForm" />;
};

export default PrivateRoute;
