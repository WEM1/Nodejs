import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <Link href={'./'}>Home</Link>
      <Link href={'./Einkaufsliste/'}>Einkaufsliste</Link>
      <Link href={'./Chatbox/'}>Chatbox</Link>
    </nav>
  );
}
