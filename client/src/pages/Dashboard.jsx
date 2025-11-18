import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import AuthContext from '../context/AuthContext';
import FoodList from '../components/FoodList';
import FoodForm from '../components/FoodForm';
import ExpiringBanner from '../components/ExpiringBanner';

export default function Dashboard(){
  const { token, user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [expiring, setExpiring] = useState([]);
  const [editing, setEditing] = useState(null);

  async function load(){
    try {
      const res = await api.list(token);
      setItems(res.data || []);
    } catch (err) {
      console.error('Error loading items', err);
    }
  }

  async function loadExpiring(){
    try {
      const res = await api.expiring(token, 7);
      setExpiring(res.data || []);
    } catch (err) {
      console.error('Error loading expiring items', err);
    }
  }

  useEffect(()=> {
    if (token) {
      load();
      loadExpiring();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function handleCreate(data){
    await api.create(token, data);
    await load();
    await loadExpiring();
  }

  async function handleDelete(id){
    await api.remove(token, id);
    await load();
    await loadExpiring();
  }

  async function handleUpdate(id, data){
    await api.update(token, id, data);
    setEditing(null);
    await load();
    await loadExpiring();
  }

  async function handleSuggestDonationForAll(itemsToSuggest){
    if (!itemsToSuggest || itemsToSuggest.length === 0) return;
    try {
      await Promise.all(itemsToSuggest.map(it => api.toggleDonate(token, it._id, true)));
      await load();
      await loadExpiring();
      alert('Marked items as suggested for donation.');
    } catch (err) {
      console.error(err);
      alert('Error suggesting donation');
    }
  }

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>

      <ExpiringBanner items={expiring} onClose={() => setExpiring([])} onSuggest={handleSuggestDonationForAll} />

      <FoodForm onSubmit={handleCreate} />
      <hr/>
      <FoodList items={items} onEdit={setEditing} onDelete={handleDelete} />
      {editing && (
        <div style={{ marginTop: 12 }}>
          <h3>Edit</h3>
          <FoodForm initial={editing} onSubmit={(d) => handleUpdate(editing._id, d)} />
          <button onClick={() => setEditing(null)} style={{ marginTop: 8 }}>Close</button>
        </div>
      )}
    </div>
  );
}
