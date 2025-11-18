import React, { useState, useContext } from 'react';
import api from '../api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const { setUser, setToken } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await api.register(form);
      setToken(res.data.token);
      setUser(res.data.user);
      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
      <button>Register</button>
    </form>
  );
}
