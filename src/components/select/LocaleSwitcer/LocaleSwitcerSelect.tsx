'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { usePathname, useRouter } from '@/navigation';

type LocaleSwitcerSelectProps = {
  children: React.ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcerSelect({
  children,
  defaultValue,
  label,
}: LocaleSwitcerSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const param = useParams();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      // @ts-expect-error: `param` might not be typed correctly for locale routing purposes.
      router.replace({ pathname, param }, { locale: nextLocale });
    });
  };

  return (
    <label
      className={clsx(
        'relative text-gray-400',
        isPending ? 'transition-opacity [&:disabled]:opacity-30' : '',
      )}
    >
      <p className='sr-only'>{label}</p>
      <Select
        defaultValue={defaultValue}
        onValueChange={onSelectChange}
        disabled={isPending}
      >
        <SelectTrigger className='inline-flex w-full px-2 py-3'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </label>
  );
}
