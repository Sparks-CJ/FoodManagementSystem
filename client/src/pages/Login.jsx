import React, { useState, useContext } from 'react';
import api from '../api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const { setUser, setToken } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await api.login(form);
      setToken(res.data.token);
      setUser(res.data.user);
      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
      <button>Login</button>
    </form>
  );
}
