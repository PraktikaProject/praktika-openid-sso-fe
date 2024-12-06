'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/navigation'; // Importing useRouter from next/navigation

import { Button } from '../ui/button';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Button
      variant='ghost'
      className='text-white'
      onClick={() => onSelectChange(locale === 'id' ? 'en' : 'id')}
    >
      {locale === 'id' ? 'EN' : 'ID'}
    </Button>
  );
}
