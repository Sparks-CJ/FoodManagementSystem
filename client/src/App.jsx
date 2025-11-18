import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AuthContext from './context/AuthContext';

export default function App(){
  const { user, logout } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <header style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Home</Link> {user ? <> | <Link to="/dashboard">Dashboard</Link> | <button onClick={logout}>Logout</button></> : <> | <Link to="/login">Login</Link></>}
      </header>
      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<h2>Food Management — SDG12</h2>} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login/>} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register/>} />
          <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
