'use client';
import { Button, Form, message, Tabs } from 'antd';
import Basic from './_components/Basic';
import Education from './_components/Education';
import Skill from './_components/Skill';
import Experience from './_components/Experience';
import { useState } from 'react';
import type { TabsProps } from 'antd';

import { IUser } from '@/store/user-store';

import { updateUserProfile } from '@/server-action/users';
import useGlobalStore from '@/store/user-store';

const items: TabsProps['items'] = [
  { key: '1', label: 'Basic', children: <Basic /> },
  { key: '2', label: 'Education', children: <Education /> },
  { key: '3', label: 'Skills', children: <Skill /> },
  { key: '4', label: 'Experience', children: <Experience /> },
];

function ProfilePage() {
  const [activeKey, setActiveKey] = useState('1');
  const [loading, setLoading] = useState(false);
  const { currentUserData, setCurrentUserData } = useGlobalStore();
  const handleFinish = async (values: any) => {
    const userId = currentUserData?._id as string;
    try {
      setLoading(true);
      const updateProfile = {
        profileDataForResume: values,
      };
      const response = await updateUserProfile({ userId, data: updateProfile });
      if (response.message === 'success') {
        const user = response.data as IUser;
        setCurrentUserData(user.profileDataForResume);
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
    <div>
      <h1 className='text-lg font-bold uppercase text-primary'>Profile</h1>
      <Form
        layout='vertical'
        onFinish={(values) => handleFinish(values)}
        initialValues={currentUserData?.profileDataForResume}
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
          <Button type='primary' htmlType='submit' loading={loading}>
            Save & Update
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default ProfilePage;
