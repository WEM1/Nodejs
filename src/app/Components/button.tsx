import { useState } from 'react';

export default function Button({ text }: { text: string }) {
  const [CurrentLikeCount, LikeCounterUp] = useState(0);
  return (
    <div>
      <button onClick={() => LikeCounterUp(CurrentLikeCount + 1)}>
        {text}
      </button>
      <p> {CurrentLikeCount}</p>
    </div>
  );
}
