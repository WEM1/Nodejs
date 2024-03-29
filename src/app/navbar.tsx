import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <Link href={'./'}>Home</Link>
      <Link href={'./Einkaufsliste/'}>Einkaufsliste</Link>
      <Link href={'./Chatbox/'}>Chatbox</Link>
      <Link href={'./PokeAPI/'}>PokeAPI</Link>
      <Link href={'./Components/'}>Utilities</Link>
    </nav>
  );
}
