'use client';
import { deleteTemplateById, ITemplate } from '@/server-action/templates';
import { Button, message, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { Pen, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ITemplateWithkey extends ITemplate {
  key: string;
}

function TemplateTable({ data }: { data: ITemplate[] }) {
  const router = useRouter();
  const templatesWithKey: ITemplateWithkey[] = data.map((template) => {
    const templateWitKey = { ...template, key: template._id };
    return templateWitKey;
  });
  const columns: TableProps<ITemplateWithkey>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Is Only For Subscribers',
      dataIndex: 'isOnlyForSubscribers',
      render: (value: boolean) => (value ? 'Yes' : 'No'),
      key: 'isOnlyForSubscribers',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (value: string) => dayjs(value).format('MM DD, YYYY hh:mm A'),
      key: 'createdAt',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: ITemplate, index) => (
        <div className='flex gap-5'>
          <Button size='small' onClick={() => handleDelete(record._id)}>
            <Trash2 size={12} />
          </Button>
          <Button
            size='small'
            onClick={() => router.push(`/admin/templates/edit/${record._id}`)}
          >
            <Pen size={12} />
          </Button>
        </div>
      ),
      key: 'action',
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteTemplateById(id);
      if (response.success) {
        message.success('deleted template sucessfully');
      }
      router.push('/admin/templates');
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return <Table columns={columns} dataSource={templatesWithKey} />;
}
export default TemplateTable;
