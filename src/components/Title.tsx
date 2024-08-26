'use client';

import { useRouter } from 'next/navigation';

function Title({ username }: { username: string }) {
  const router = useRouter();
  return (
    <h1
      className='text-sm text-white cursor-pointer'
      onClick={() => router.push('/profile')}
    >
      {username}
    </h1>
  );
}
export default Title;
