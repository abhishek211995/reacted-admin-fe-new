import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
    const location = useLocation();

    // console.log(getCookie()?.length)
    const access_key = localStorage.getItem("access_key");
    const role_id = localStorage.getItem("role_id");
    useEffect(() => {
        if (!access_key || !role_id) {
            <Navigate to="/login" state={{ from: location }} replace />;

        } 
    }, [children])

    return children;
};

export default ProtectedRoute;
