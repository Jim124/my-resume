'use client';

import Mustache from 'mustache';

import { ITemplate } from '@/server-action/templates';
import { IUser } from '@/store/user-store';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

function Resume({
  template,
  currentUser,
}: {
  template: ITemplate;
  currentUser: IUser;
}) {
  const router = useRouter();
  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (currentUser.role === 'admin')
    return <div>Please choose another user account</div>;
  const html = Mustache.render(
    template.html,
    currentUser?.profileDataForResume
  );
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-end gap-5'>
        <Button type='default' onClick={() => router.push('/')}>
          Back To Templates
        </Button>
        <Button type='primary' onClick={handlePrint}>
          Print Or Save
        </Button>
      </div>
      <div className='border border-gray-300 border-solid rounded-sm'>
        <div dangerouslySetInnerHTML={{ __html: html }} ref={componentRef} />
      </div>
    </div>
  );
}
export default Resume;
