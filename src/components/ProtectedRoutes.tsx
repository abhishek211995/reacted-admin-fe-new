import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from 'src/contexts/AuthContext';
import Login from 'src/pages/Register/Login';

const ProtectedRoute = ({ children }: any) => {
    const nav = useNavigate()

    const access_key = localStorage.getItem("access_key");
    const role_id = localStorage.getItem("role_id");

    if (access_key === null || role_id?.length === null) {
        nav('/login');
        return <Login />;
    }
    return children;
};

export default ProtectedRoute;
