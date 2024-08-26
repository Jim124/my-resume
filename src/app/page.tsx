import Header from '@/components/Header';
import { getAllTemplates, ITemplate } from '@/server-action/templates';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const response = await getAllTemplates();
  if (!response.success) return <div>{response.message}</div>;
  const data: ITemplate[] = response.data;
  return (
    <>
      <Header />
      <div className='flex flex-col gap-5 items-start mt-5'>
        <div>
          <h1 className='text-xl font-bold text-primary'>Templates</h1>
          <span className='text-gray-500 text-sm'>
            Browse through our collection of templates
          </span>
        </div>
        <div className='mt-10 grid grid-cols-5 gap-10'>
          {data.map((template) => {
            const url = template.thumbnail;
            return (
              <Link key={template._id} href={`/templates/${template._id}`}>
                <div className='border border-gray-200 border-solid hover:border-gray-400 relative'>
                  <Image
                    src={url}
                    alt={template.name}
                    className='w-full h-96 rounded object-cover'
                    width={192}
                    height={192}
                  />
                  {/* <img src={template.thumbnail} className='w-full h-96' /> */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
