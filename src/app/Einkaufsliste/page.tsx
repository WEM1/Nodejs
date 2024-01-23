'use client';
import Navbar from '../navbar';
import { useState } from 'react';
import '@/app/global.css';
import style from './styles.module.css';

interface Item {
  name: string;
  count: number;
  color: string;
}

export default function Einkaufsliste() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [itemText, setItemText] = useState('');
  const [itemAmount, setItemAmount] = useState(0);

  const handleAddItem = () => {
    setAllItems([
      ...allItems,
      { name: itemText, count: itemAmount, color: '#ccc' },
    ]);
  };
  const removeItem = (index: number) => {
    setAllItems((oldValues) => {
      return oldValues.filter((_, i) => i !== index);
    });
  };
  const removeList = () => {
    setAllItems([]);
  };

  return (
    <main>
      <Navbar />
      <div>
        <input
          type='text'
          placeholder='new Item'
          value={itemText}
          onChange={(event) => setItemText(event.target.value)}
        />
        <input
          type='number'
          placeholder='0'
          value={itemAmount}
          onChange={(event) => setItemAmount(+event.target.value)}
        />
        <button onClick={handleAddItem}>add</button>
        <button onClick={() => removeList()}>Remove List</button>
      </div>

      <div className={style.shoppingList}>
        {allItems.map((item, index) => (
          <section key={index}>
            <div
              onClick={() => {
                allItems[index].color = '#009900';
                setAllItems([...allItems]);
              }}
              style={{ backgroundColor: item.color }}
            >
              <p>Artikel: {index}</p>
              <p>{item.name}</p>
              <p>{item.count}</p>
            </div>
            <button onClick={() => removeItem(index)}>Remove</button>
          </section>
        ))}
      </div>
    </main>
  );
}
