import Logo from '@/components/Logo';
import UserOrAdmin from '@/components/UserOrAdmin';
import { UserButton, SignedIn } from '@clerk/nextjs';

function Header() {
  return (
    <div className='p-5 flex justify-between items-center bg-primary'>
      <Logo />
      <div className='flex gap-5 items-center'>
        <UserOrAdmin />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
export default Header;
