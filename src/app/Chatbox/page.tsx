'use client';
import '@/app/global.css';
import styles from './styles.module.css';
import profilePic from '../../../public/avatar-for-praxis/avatar2.svg';

import Navbar from '../navbar';
import { getCurrentDate } from '../Functions/getTime';
import { Key, useState } from 'react';
import Image from 'next/image';

interface message {
  text: string;
  time: string;
  sender: string;
  imageSize?: number;
}

export default function Chatbox() {
  const [allMessages, setAllMessages] = useState<message[]>([]);
  const [allMessageContent, setAllMessageContent] = useState('');

  function buttonClick() {
    setAllMessages([
      ...allMessages,
      {
        text: allMessageContent,
        time: getCurrentDate(),
        sender: 'Harald',
        imageSize: 50,
      },
    ]);
  }

  return (
    <main>
      <Navbar />
      <section className={styles.section}>
        {allMessages.map((message, index) => (
          <div key={index} className={styles.message}>
            <div>
              <p>{message.text}</p>
              <p>{message.time}</p>
            </div>
            <div>
              <Image
                key={index}
                src={profilePic}
                width={allMessages[index].imageSize}
                height={allMessages[index].imageSize}
                alt='this is the author of the message'
                onMouseEnter={() => {
                  allMessages[index].imageSize = 100;
                  setAllMessages([...allMessages]);
                }}
                onMouseLeave={() => {
                  allMessages[index].imageSize = 50;
                  setAllMessages([...allMessages]);
                }}
              />
              <p>{message.sender}</p>
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
          onKeyDown={(event) => {
            if (event.keyCode == 13) {
              buttonClick();
            }
          }}
        />
        <button onClick={buttonClick}>Send</button>
      </div>
    </main>
  );
}
