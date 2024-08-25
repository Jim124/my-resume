'use server';

import { connectMongoDB } from '@/config/db';
import UserModel from '@/models/userModel';
import { IUser } from '@/store/user-store';
import { currentUser } from '@clerk/nextjs/server';

type UserResponse = {
  message: string;
  data: IUser | null;
};

connectMongoDB();

export const getCurrentUserFromDB = async (): Promise<UserResponse> => {
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
    const result: UserResponse = {
      message: 'success',
      data: JSON.parse(JSON.stringify(newUser)),
    };
    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'there was an error';
    const errorResonponse: UserResponse = {
      message,
      data: null,
    };
    return errorResonponse;
  }
};

export const updateUserProfile = async ({
  userId = '',
  data = {},
}: {
  userId: string;
  data: any;
}): Promise<UserResponse> => {
  try {
    const response = await UserModel.findByIdAndUpdate(userId, data);
    return {
      message: 'success',
      data: JSON.parse(JSON.stringify(response)),
    } as UserResponse;
  } catch (error) {
    return { message: 'failed', data: null } as UserResponse;
  }
};
