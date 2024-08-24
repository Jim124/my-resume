'use client';
import Spinner from '@/components/Spinner';
import { getCurrentUserFromDB } from '@/server-action/users';
import useGlobalStore, { IUser } from '@/store/user-store';
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const { setCurrentUserData, currentUserData } = useGlobalStore();
  const [isLadong, setIsLoading] = useState(false);
  const router = useRouter();
  const isSignInOrSignUp =
    !pathName.includes('/sign-in') && !pathName.includes('/sign-up');
  useEffect(
    function () {
      async function getCurrentUser() {
        try {
          setIsLoading(true);
          const response = await getCurrentUserFromDB();
          if (response.message === 'success') {
            const user = response.data as IUser;
            setCurrentUserData(user);
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
      if (isSignInOrSignUp && !currentUserData?._id) {
        getCurrentUser();
      }
    },
    [currentUserData]
  );

  if (!isSignInOrSignUp) {
    return <div>{children}</div>;
  }
  if (isLadong)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    );
  return (
    <div>
      <div className='p-5 flex justify-between items-center bg-primary'>
        <h1
          className='text-white text-xl font-bold cursor-pointer'
          onClick={() => router.push('/')}
        >
          My Resume
        </h1>
        <div className='flex gap-5 items-center'>
          {currentUserData && (
            <h1
              className='text-sm text-white cursor-pointer'
              onClick={() => router.push('/profile')}
            >
              {currentUserData.name}
            </h1>
          )}
          <UserButton />
        </div>
      </div>
      <div className='p-5'>{children}</div>
    </div>
  );
}
export default LayoutProvider;
