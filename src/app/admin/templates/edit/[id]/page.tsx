import { getTemplateById } from '@/server-action/templates';
import TemplateForm from '../../_components/template-form';

async function EditTemplatePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const response = await getTemplateById(id);
  if (!response.success) return <div>{response.message}</div>;
  return (
    <div>
      <h1 className='text-xl font-bold text-primary'>Edit Template</h1>
      <TemplateForm initialValues={response.data} type='edit' />
    </div>
  );
}
export default EditTemplatePage;
