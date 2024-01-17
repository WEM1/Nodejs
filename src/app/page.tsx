'use client';
import Link from 'next/link';
import Button from './Components/button';
import Navbar from './navbar';
import '@/app/global.css';

export default function Home() {
  return (
    <main>
      {Navbar()}
      <label>
        <div></div>
      </label>
    </main>
  );
}
