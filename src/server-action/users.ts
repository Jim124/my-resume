'use server';

import { connectMongoDB } from '@/config/db';
import UserModel from '@/models/userModel';
import { IUser } from '@/store/user-store';
import { currentUser } from '@clerk/nextjs/server';
import { message } from 'antd';

connectMongoDB();

export const getCurrentUserFromDB = async () => {
  try {
    const clerkUser = await currentUser();
    const name = clerkUser?.username
      ? clerkUser?.username
      : clerkUser?.firstName + ' ' + clerkUser?.lastName;
    const clerkUserId = clerkUser?.id;
    const user = await UserModel.findOne({ clerkUserId: clerkUserId });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }
    const isFirstAccount = (await UserModel.countDocuments()) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const userObj = {
      clerkUserId,
      name,
      email: clerkUser?.emailAddresses[0].emailAddress,
      profilePictureUrl: clerkUser?.imageUrl,
      profileDataForResume: {},
      role,
    };
    const newUser = await UserModel.create(userObj);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'failed to create user',
    };
  }
};

export const updateUserProfile = async ({
  userId,
  data,
}: {
  userId: string;
  data: any;
}) => {
  console.log(userId);
  console.log(data);
  try {
    const response = await UserModel.findByIdAndUpdate(userId, data);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
