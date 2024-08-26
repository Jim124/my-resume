import Header from '@/components/Header';
import Profile from '@/components/Profile';
import { getCurrentUserFromDB } from '@/server-action/users';
import { redirect } from 'next/navigation';

async function ProfilePage() {
  const response = await getCurrentUserFromDB();
  if (!response.success) redirect('/sign-in');
  const user = response.data;
  return (
    <>
      <Header />
      <Profile user={user} />
    </>
  );
}
export default ProfilePage;
