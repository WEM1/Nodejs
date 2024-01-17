'use client';
import '@/app/global.css';
import styles from './styles.module.css';
import '../public/avatar-for-praxis/avatar2.svg';

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
              <image
                className='styles.imageSender'
                href='../public/avatar-for-praxis/avatar2.svg'
                width={50}
                height={50}
                alt='this is the author of the message'
              />
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
