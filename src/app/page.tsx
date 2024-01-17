'use client';
import Link from 'next/link';
import Button from './Components/button';
import Navbar from './navbar';
import '@/app/global.css';
import { useState } from 'react';

export default function Home() {
  const [CurrentLikeCount, LikeCounterUp] = useState(0);

  return (
    <main>
      {Navbar()}
      <label>
        <div>
          {/* <Button children={'Test this'} onClick={LikeCounterUp()}></Button> */}
          <p>{CurrentLikeCount}</p>
        </div>
      </label>
    </main>
  );
}
