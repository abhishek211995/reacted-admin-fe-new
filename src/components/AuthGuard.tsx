import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const AuthGuard = ({ children }) => {
  const router = useNavigate()
  useEffect(() => {
    const access_key = localStorage.getItem("access_key");
    const role_id = localStorage.getItem("role_id");
    if (!access_key || !role_id) {
      router("/login");
    }
  }, [children, router]);
  
}

export default AuthGuard