'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import LocaleSwitcher from '../button/locale-switcer';

const formLoginSchema = z.object({
  email: z.string().min(8, { message: 'Email must be at least 8 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

type UserFormValue = z.infer<typeof formLoginSchema>;

interface IUserAuthFormProps {
  readonly redirect_url: string;
}

export default function LoginForm({ redirect_url }: IUserAuthFormProps) {
  const t = useTranslations('LoginForm');
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: '',
    password: '',
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formLoginSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      await axios.post(``, data);
      window.location.href = redirect_url;
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t('username')}
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='password'
                  placeholder={t('password')}
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className='ml-auto w-full bg-[#f1c40f] text-[#013880]'
          type='submit'
        >
          {loading ? 'Loading...' : t('submit')}
        </Button>
        <div className='flex justify-between gap-2 pt-2 text-white'>
          <h3 className=''>{t('forgotPassword')}</h3>
          <LocaleSwitcher />
        </div>
      </form>
    </Form>
  );
}
