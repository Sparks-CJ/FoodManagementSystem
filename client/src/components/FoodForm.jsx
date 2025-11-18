import React, { useState } from 'react';

export default function FoodForm({ onSubmit, initial }){
  const [form, setForm] = useState({
    name: initial?.name || '',
    category: initial?.category || '',
    quantity: initial?.quantity || 0,
    unit: initial?.unit || 'pcs',
    expiryDate: initial?.expiryDate ? initial.expiryDate.split('T')[0] : '',
    donate: initial?.donate || false,
    notes: initial?.notes || ''
  });

  function submit(e){
    e.preventDefault();
    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      expiryDate: form.expiryDate || undefined
    });
    if(!initial) setForm({ name:'', category:'', quantity:0, unit:'pcs', expiryDate:'', donate:false, notes:'' });
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
      <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required />
      <input type="number" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} />
      <input placeholder="Unit" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})} />
      <input type="date" value={form.expiryDate} onChange={e=>setForm({...form,expiryDate:e.target.value})} />
      <label><input type="checkbox" checked={form.donate} onChange={e=>setForm({...form,donate:e.target.checked})} /> Donate</label>
      <input placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
      <button type="submit">{initial ? 'Update' : 'Add'}</button>
    </form>
  );
}
