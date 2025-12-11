import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth); // Get user info from Redux
    // const token = document.cookie.includes('token'); // Check for a specific cookie
    const location = useLocation(); // Current location

    // If user and token exist, render children, else redirect to login
    return user  ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
