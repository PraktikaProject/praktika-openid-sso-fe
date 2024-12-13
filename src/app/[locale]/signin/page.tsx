'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import LoginForm from '@/components/form/login-form';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const oauthUrl = `${baseUrl}/openid/authorize?${searchParams.toString()}`;
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#013880]'>
      <section className='-mt-4 w-full max-w-xs rounded-lg bg-slate-50/50 px-10 pb-10'>
        <div className='flex items-center justify-between pb-8'>
          <Image
            src='/logo/logo_its.png'
            height={100}
            width={100}
            alt='logo'
            className='-mt-1'
          />
          <Image
            src='/logo/logo_sso.png'
            height={100}
            width={100}
            alt='logo'
            className='h-8'
          />
        </div>

        <LoginForm oauthUrl={oauthUrl} />
      </section>
      <div className='flex justify-center text-sm text-white'>
        <h3 className='pt-2 text-xs'>
          © 2024 Institut Teknologi Sepuluh Nopember.{' '}
          <span className='italic'>v2.7.3</span>
        </h3>
      </div>
    </div>
  );
}
