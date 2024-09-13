import React from 'react';

const KeyList = ({ keys, removeKey }) => {
  return (
    <div>
      <h2>Chaves SSH</h2>
      <ul>
        {keys.map((key, index) => (
          <li key={index}>
            {key} 
            <button onClick={() => removeKey(key)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyList;
