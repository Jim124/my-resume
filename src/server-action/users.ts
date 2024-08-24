'use server';

import { connectMongoDB } from '@/config/db';
import UserModel from '@/models/userModel';
import { currentUser } from '@clerk/nextjs/server';

type UserResponse = {
  message: string;
  data: {};
};

connectMongoDB();

export const getCurrentUserFromDB = async (): Promise<UserResponse | null> => {
  try {
    const clerkUser = await currentUser();
    const name = clerkUser?.username
      ? clerkUser?.username
      : clerkUser?.firstName + ' ' + clerkUser?.lastName;
    const clerkUserId = clerkUser?.id;
    const user = await UserModel.findOne({ clerkUserId: clerkUserId });
    if (user) {
      const response: UserResponse = {
        message: 'success',
        data: JSON.parse(JSON.stringify(user)),
      };
      return response;
    }
    const userObj = {
      clerkUserId,
      name,
      email: clerkUser?.emailAddresses[0].emailAddress,
      profilePictureUrl: clerkUser?.imageUrl,
      profileDataForResume: {},
    };
    const newUser = await UserModel.create(userObj);
    const result: UserResponse = {
      message: 'success',
      data: JSON.parse(JSON.stringify(newUser)),
    };
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
