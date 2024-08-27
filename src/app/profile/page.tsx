import Header from '@/components/Header';
import Profile from '@/components/Profile';
import { ProgressContextProvider } from '@/context/ProgressContext';
import { getCurrentUserFromDB } from '@/server-action/users';
import { redirect } from 'next/navigation';

async function ProfilePage() {
  const response = await getCurrentUserFromDB();
  if (!response.success) redirect('/sign-in');
  const user = response.data;
  return (
    <>
      <Header />
      <ProgressContextProvider>
        <Profile user={user} />
      </ProgressContextProvider>
    </>
  );
}
export default ProfilePage;
