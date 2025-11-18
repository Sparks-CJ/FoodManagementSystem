import React from 'react';

export default function ExpiringBanner({ items, onClose, onSuggest }) {
  if (!items || items.length === 0) return null;

  return (
    <div style={{
      padding: 12,
      background: '#fff3cd',
      border: '1px solid #ffeeba',
      borderRadius: 6,
      marginBottom: 12
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <strong>{items.length}</strong> item(s) expiring soon.
          <div style={{ fontSize: 13, color: '#7d6608', marginTop: 6 }}>
            {items.slice(0,3).map(it => `${it.name} (${it.quantity} ${it.unit})`).join(', ')}
            {items.length > 3 && `, +${items.length - 3} more`}
          </div>
        </div>

        <div>
          <button onClick={onClose} style={{ marginRight: 8 }}>Dismiss</button>
          <button onClick={() => onSuggest(items)}>Suggest Donation for All</button>
        </div>
      </div>
    </div>
  );
}
