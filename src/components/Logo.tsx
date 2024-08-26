'use client';
import { useRouter } from 'next/navigation';
function Logo() {
  const router = useRouter();
  return (
    <h1
      className='text-white text-xl font-bold cursor-pointer'
      onClick={() => router.push('/')}
    >
      My Resume
    </h1>
  );
}
export default Logo;
