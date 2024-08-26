'use client';
import { IUser } from '@/store/user-store';

import { useState } from 'react';

import { Button, Form, message, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { updateUserProfile } from '@/server-action/users';
import Basic from './profile/Basic';
import Education from './profile/Education';
import Experience from './profile/Experience';
import Skill from './profile/Skill';
import SubmitButton from './SubmitButton';

const items: TabsProps['items'] = [
  { key: '1', label: 'Basic', children: <Basic /> },
  { key: '2', label: 'Education', children: <Education /> },
  { key: '3', label: 'Skills', children: <Skill /> },
  { key: '4', label: 'Experience', children: <Experience /> },
];

function Profile({ user }: { user: IUser }) {
  const [activeKey, setActiveKey] = useState('1');
  const [loading, setLoading] = useState(false);
  const handleFinish = async (values: any) => {
    const userId = user._id;
    try {
      setLoading(true);
      ['skills', 'education', 'experience'].forEach((key) => {
        if (!values[key]) {
          values[key] = user?.profileDataForResume[key] || [];
        }
      });
      const updateProfile = {
        profileDataForResume: values,
      };
      const response = await updateUserProfile({ userId, data: updateProfile });
      if (response.success) {
        message.success('Profile updated successfully');
      } else {
        message.error('Failed to update profile ');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='p-5'>
      <h1 className='text-lg font-bold uppercase text-primary'>Profile</h1>
      <Form
        layout='vertical'
        onFinish={(values) => handleFinish(values)}
        initialValues={user?.profileDataForResume}
      >
        <Tabs
          defaultActiveKey='1'
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          items={items}
        />
        <div className='flex justify-end gap-10 mt-10'>
          <Button disabled={loading} htmlType='reset'>
            Cancel
          </Button>
          {/* <Button type='primary' htmlType='submit' loading={loading}>
            Save & Update
          </Button> */}
          <SubmitButton loading={loading} text='Save & Update' />
        </div>
      </Form>
    </div>
  );
}
export default Profile;
