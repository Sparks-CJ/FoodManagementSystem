import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });
  const [token, setToken] = useState(()=> localStorage.getItem('token') || null);

  useEffect(()=> {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [user, token]);

  function logout(){ setUser(null); setToken(null); }

  return <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
