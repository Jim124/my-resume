'use client';

import Mustache from 'mustache';

import { ITemplate } from '@/server-action/templates';
import { IUser } from '@/store/user-store';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

function Resume({
  template,
  currentUser,
}: {
  template: ITemplate;
  currentUser: IUser;
}) {
  const router = useRouter();
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
        <Button type='primary'>Download</Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
export default Resume;
