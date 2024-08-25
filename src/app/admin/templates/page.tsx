import { getAllTemplates } from '@/server-action/templates';
import { Button } from 'antd';
import Link from 'next/link';
import TemplateTable from './_components/template-table';

async function TemplatePage() {
  const response = await getAllTemplates();
  if (!response.success) {
    return <div>{response.message}</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold text-primary'>Templates</h1>
        <Button>
          <Link href='/admin/templates/new'>New template</Link>
        </Button>
      </div>
      <TemplateTable data={response.data} />
    </div>
  );
}
export default TemplatePage;
