import Navbar from '../navbar';
import Button from './button';

export default function utilities() {
  return (
    <main>
      <Navbar />
      <Button children={'Click This'} />
    </main>
  );
}
