import { getCurrentUserFromDB } from '@/server-action/users';

import { redirect } from 'next/navigation';
import AdminMenu from './AdminMenu';
import Title from './Title';

async function UserOrAdmin() {
  const response = await getCurrentUserFromDB();
  if (!response.success) redirect('/sign-in');
  const user = response.data;
  const isAdmin = user.role === 'admin';
  if (isAdmin) {
    return <AdminMenu />;
  }
  return <Title username={user.name} />;
}
export default UserOrAdmin;
