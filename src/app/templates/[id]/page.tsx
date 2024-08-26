import { getTemplateById } from '@/server-action/templates';
import Resume from '../_components/Resume';
import { getCurrentUserFromDB } from '@/server-action/users';
import { redirect } from 'next/navigation';

async function TemplatesPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const response = await getTemplateById(id);
  const userResponse = await getCurrentUserFromDB();
  if (!userResponse.success) redirect('/sign-in');
  const currentUser = userResponse.data;

  return (
    <div className='flex justify-center mt-5'>
      <Resume template={response.data} currentUser={currentUser} />
    </div>
  );
}
export default TemplatesPage;
