'use client';

import { useEffect } from 'react';

import { useRouter } from '@/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/signin');
  }, [router]);

  return <></>;
}
