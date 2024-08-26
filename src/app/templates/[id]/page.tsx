import { getTemplateById } from '@/server-action/templates';
import Resume from '../_components/Resume';

async function TemplatesPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const response = await getTemplateById(id);

  return (
    <div>
      <Resume template={response.data} />
    </div>
  );
}
export default TemplatesPage;
