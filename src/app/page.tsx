import Image from 'next/image';

import { UserButton } from '@clerk/nextjs';
import { connectMongoDB } from '@/config/db';

export default async function Home() {
  await connectMongoDB();
  return (
    <div className='p-5'>
      <UserButton />
    </div>
  );
}
