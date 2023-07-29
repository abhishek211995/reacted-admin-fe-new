import React, { createContext, useState, useContext } from 'react';

export interface User {
  name: any;
  email: any;
  userId: any;
  access_token: any;
  role_id: any;
  role_id1: any;
  phone: any;
  first_name?: string;
  last_name?: string;
  user_id?: string;
}

export type Creator = {
  user_id: string;
  first_name: string;
  last_name: any;
  email: string;
  phone: string;
  role: string;
  artist_name: string;
  description: string;
  added_date: string;
  updated_date: string;
  categories: string;
  images: string;
  music_creator_id: string;
};

interface AuthContextProps {
  user: any | null;
  isLoggedIn: boolean;
  loading: any;
  signIn: (user: User) => void;
  signOut: () => void;
}
const AuthContext = createContext<AuthContextProps>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    userId: '',
    access_token: '',
    role_id: '',
    role_id1: '',
    phone: ''
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = (userData: Partial<User>) => {
    setLoading(true);
    setUser({
      name: userData?.first_name,
      email: userData?.email,
      userId: userData?.user_id,
      access_token: userData?.access_token,
      role_id: userData?.role_id,
      role_id1: userData?.role_id1,
      phone: userData?.phone
    });
    localStorage.setItem('access_key', JSON.stringify(userData?.access_token));
    localStorage.setItem('role_id', JSON.stringify(userData?.role_id1));
    localStorage.setItem('user_id', JSON.stringify(userData?.userId));
    setLoggedIn(true);
    setLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('access_key');
    localStorage.removeItem('role_id1');
    localStorage.removeItem('user_id');
    setLoggedIn(false);
    setLoading(false);
  };

  const value = { user, isLoggedIn, loading, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;
