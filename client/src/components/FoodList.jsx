import React from 'react';

export default function FoodList({ items = [], onEdit, onDelete }){
  if (!items.length) return <p>No items yet.</p>;
  return (
    <ul>
      {items.map(item => {
        const exp = item.expiryDate ? new Date(item.expiryDate) : null;
        const days = exp ? Math.ceil((new Date(exp) - new Date())/(1000*60*60*24)) : null;
        return (
          <li key={item._id} style={{ marginBottom:10 }}>
            <strong>{item.name}</strong> — {item.category} — {item.quantity} {item.unit}
            {exp && <span> — expires in {days} days</span>}
            {item.donate && <span> — marked for donation</span>}
            <div>
              <button onClick={()=>onEdit(item)}>Edit</button>
              <button onClick={()=>onDelete(item._id)}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
