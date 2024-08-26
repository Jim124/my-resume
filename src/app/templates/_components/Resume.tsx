'use client';

import Mustache from 'mustache';

import { ITemplate } from '@/server-action/templates';
import useGlobalStore from '@/store/user-store';

function Resume({ template }: { template: ITemplate }) {
  const { currentUserData } = useGlobalStore();
  const html = Mustache.render(
    template.html,
    currentUserData?.profileDataForResume
  );
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
export default Resume;
