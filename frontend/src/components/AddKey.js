import React, { useState } from 'react';

const AddKey = ({ addKey }) => {
  const [newKey, setNewKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newKey.trim()) {
      addKey(newKey);
      setNewKey('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Insira a chave SSH"
        value={newKey}
        onChange={(e) => setNewKey(e.target.value)}
      />
      <button type="submit">Adicionar Chave</button>
    </form>
  );
};

export default AddKey;
