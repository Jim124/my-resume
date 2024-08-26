'use client';

import { usePathname } from 'next/navigation';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignInOrSignUp =
    !pathname.includes('/sign-in') && !pathname.includes('/sign-up');
  // if (isAdmin && currentUserData?.role === 'user' && !isLoading) {
  //   return (
  //     <div className=' text-sm text-gray-500 flex justify-center items-center h-screen '>
  //       You are not authorized to access this page
  //     </div>
  //   );
  // }
  if (!isSignInOrSignUp) {
    return <div>{children}</div>;
  }

  return (
    <div>
      <div className='p-5'>{children}</div>
    </div>
  );
}
export default LayoutProvider;
