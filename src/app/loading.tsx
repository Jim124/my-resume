'use client';

import Spinner from '@/components/Spinner';
function loading() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Spinner />
    </div>
  );
}
export default loading;
