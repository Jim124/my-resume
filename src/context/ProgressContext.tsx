'use client';
import { getCurrentUserFromDB } from '@/server-action/users';
import { useState, createContext, useContext, useEffect } from 'react';

type ProgressProviderProps = {
  children: React.ReactNode;
  defaultValue?: 0;
};

type Progress = {
  progressNum: number;
  setProgressNum: (value: number) => void;
};

const ProgressContext = createContext<Progress | undefined>(undefined);

export function ProgressContextProvider({
  children,
  defaultValue = 0,
}: ProgressProviderProps) {
  const [progressNum, setProgressNum] = useState<number>(defaultValue);
  useEffect(() => {
    async function getProgressNum() {
      const response = await getCurrentUserFromDB();
      if (!response.success) return;
      const progressNum = response.data.profileDataForResume.progressNum;
      setProgressNum(progressNum ?? 0);
    }
    getProgressNum();
  }, []);
  return (
    <ProgressContext.Provider value={{ progressNum, setProgressNum }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgressContext = () => {
  const context = useContext(ProgressContext);
  if (context === undefined)
    throw new Error(' context was used outside provider');
  return context;
};
