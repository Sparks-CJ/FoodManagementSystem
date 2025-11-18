import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import AuthContext from '../context/AuthContext';
import FoodList from '../components/FoodList';
import FoodForm from '../components/FoodForm';

export default function Dashboard(){
  const { token, user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  async function load(){
    const res = await api.list(token);
    setItems(res.data);
  }
  useEffect(()=>{ if (token) load(); }, [token]);

  async function handleCreate(data){
    await api.create(token, data);
    load();
  }
  async function handleDelete(id){
    await api.remove(token, id);
    load();
  }
  async function handleUpdate(id, data){
    await api.update(token, id, data);
    setEditing(null);
    load();
  }

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>
      <FoodForm onSubmit={handleCreate} />
      <hr/>
      <FoodList items={items} onEdit={setEditing} onDelete={handleDelete} />
      {editing && <div><h3>Edit</h3><FoodForm initial={editing} onSubmit={(d)=>handleUpdate(editing._id,d)} /></div>}
    </div>
  );
}
