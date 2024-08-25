'use client';
import { Button, Form, Input, message, Radio, Upload } from 'antd';
import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useRouter } from 'next/navigation';
import { uploadFileToFireBase } from '@/helper/uploadFile';
import {
  createTemplate,
  ITemplate,
  updateTemplateById,
} from '@/server-action/templates';
import SubmitButton from '@/components/SubmitButton';

function TemplateForm({
  initialValues = {},
  type = 'new',
}: {
  initialValues?: any;
  type?: 'new' | 'edit';
}) {
  const [thumbnail, setThumbnail] = useState<any>(
    initialValues?.thumbnail || ''
  );
  const [html, setHtml] = useState<any>(initialValues?.html || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  let selectedFilesList: any[] = [];
  if (type === 'edit' && thumbnail && typeof thumbnail === 'string') {
    selectedFilesList = [
      {
        url: initialValues.thumbnail,
      },
    ];
  } else if (thumbnail) {
    selectedFilesList = [
      {
        url: URL.createObjectURL(thumbnail),
      },
    ];
  } else {
    selectedFilesList = [];
  }

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      if (typeof thumbnail !== 'string') {
        values.thumbnail = await uploadFileToFireBase(thumbnail);
      } else {
        values.thumbnail = thumbnail;
      }

      values.html = html;
      let response = null;
      if (type === 'new') {
        response = await createTemplate(values);
      } else {
        response = await updateTemplateById(initialValues?._id, values);
      }
      if (response.success) {
        message.success(
          type === 'new'
            ? 'Template created successfully'
            : 'Template updated successfully'
        );
        router.push('/admin/templates');
      } else {
        message.error('failed to create template');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      method='POST'
      onFinish={handleFinish}
      className='mt-7 flex flex-col gap-4'
      layout='vertical'
      initialValues={initialValues}
    >
      <Form.Item label='Name' name='name'>
        <Input placeholder='enter template name' />
      </Form.Item>
      <Form.Item label='Thumbnail'>
        <Upload
          listType='picture-card'
          beforeUpload={(file) => {
            setThumbnail(file);
            return false;
          }}
          onRemove={() => setThumbnail(null)}
          fileList={selectedFilesList}
        >
          <div className='text-xs'>Upload Thumbnail</div>
        </Upload>
      </Form.Item>

      <Form.Item label='Is Only For Subscribers' name='isOnlyForSubscribers'>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label='HTML'>
        <CodeMirror value={html} onChange={(value) => setHtml(value)} />
      </Form.Item>
      <div className='flex justify-end gap-7 '>
        <Button onClick={() => router.push('/admin/templates')}>Cancel</Button>
        {/* <Button type='primary' htmlType='submit' disabled={loading}>
          Save
        </Button> */}
        <SubmitButton loading={loading} />
      </div>
    </Form>
  );
}
export default TemplateForm;
