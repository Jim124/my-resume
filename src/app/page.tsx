import Image from 'next/image';

import { UserButton } from '@clerk/nextjs';
import { getCurrentUserFromDB } from '@/server-action/users';

export default async function Home() {
  const userResponse = await getCurrentUserFromDB();
  if (!userResponse) return <div>there was an error</div>;
  return (
    <div className='p-5'>
      <UserButton />
    </div>
  );
}
