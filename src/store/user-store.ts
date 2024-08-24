import { create } from 'zustand';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  profileDataForResume: any;
}

interface UserState {
  currentUserData: IUser | null;
  setCurrentUserData: (data: IUser) => void;
}

const useGlobalStore = create<UserState>()((set) => ({
  currentUserData: null,
  setCurrentUserData: (data) => set({ currentUserData: data }),
}));

export default useGlobalStore;
