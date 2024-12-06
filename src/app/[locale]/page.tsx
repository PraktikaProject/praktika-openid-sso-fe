import { useTranslations } from 'next-intl';

import ThemeButton from '@/components/buttons/ThemeButton';
import LocaleSwitcer from '@/components/select/LocaleSwitcer';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className='flex min-h-screen items-center justify-center gap-2'>
      <ThemeButton />
      <h1 className='text-3xl text-black dark:text-white'>{t('title')}</h1>
      <LocaleSwitcer />
    </div>
  );
}
