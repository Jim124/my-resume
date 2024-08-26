import Header from '@/components/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='mt-5 p-5'>{children}</div>
    </>
  );
}
export default layout;
