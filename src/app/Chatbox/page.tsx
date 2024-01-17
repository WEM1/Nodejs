'use client';
import '@/app/global.css';
import styles from './styles.module.css';

import Navbar from '../navbar';
import { getCurrentDate } from '../Functions/getTime';
import { useState } from 'react';

interface message {
  text: string;
  time: string;
  sender: string;
}

export default function Chatbox() {
  const [allMessages, setAllMessages] = useState<message[]>([]);
  const [allMessageContent, setAllMessageContent] = useState('');

  return (
    <main>
      <Navbar />
      <section className={styles.section}>
        {allMessages.map((message, index) => (
          <div key={index} className={styles.message}>
            <p>{message.text}</p>
            <div>
              <p>{message.sender}</p>
              <p>{message.time}</p>
            </div>
          </div>
        ))}
      </section>
      <div>
        <input
          id='text-input'
          type='text'
          placeholder='type here'
          aria-label='test this'
          value={allMessageContent}
          onChange={(event) => setAllMessageContent(event.target.value)}
        />
        <button
          onClick={() => {
            setAllMessages([
              ...allMessages,
              {
                text: allMessageContent,
                time: getCurrentDate(),
                sender: 'Harald',
              },
            ]);
          }}
        >
          Send
        </button>
      </div>
    </main>
  );
}
