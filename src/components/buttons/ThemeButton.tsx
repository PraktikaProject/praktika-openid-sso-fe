'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { ComponentPropsWithoutRef, FC, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const ThemeButton: FC<ComponentPropsWithoutRef<'button'>> = ({
  className,
  ...rest
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      className={cn('rounded-full p-2', 'hover:bg-slate-400/20', className)}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      {...rest}
    >
      {mounted ? theme === 'light' ? <MoonIcon /> : <SunIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeButton;
