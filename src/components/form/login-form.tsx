'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import LocaleSwitcher from '@/components/button/locale-switcer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email' })
    .min(8, { message: 'Email must be at least 8 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

type UserFormValue = z.infer<typeof formLoginSchema>;

interface IUserAuthFormProps {
  oauthUrl: string;
}

interface FormInputProps {
  label: string;
  type?: 'text' | 'password';
  placeholder: string;
  field: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
  loading: boolean;
}

const FormInput = ({
  type = 'text',
  placeholder,
  field,
  loading,
}: FormInputProps) => (
  <FormItem>
    <FormControl>
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={loading}
      />
    </FormControl>
    <FormMessage />
  </FormItem>
);

export default function LoginForm({ oauthUrl }: IUserAuthFormProps) {
  const t = useTranslations('LoginForm');
  const [loading, setLoading] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<UserFormValue> = async (data) => {
    setLoading(true);
    const formData = new URLSearchParams();
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      const response = await axios.post(oauthUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const uri = response.data.data.uri;
      if (uri) {
        const newWindow = window.open(uri, '_blank');
        newWindow?.focus() ||
          alert('Popup blocked! Please allow popups for this page.');
      } else {
        alert('No URI found in the response.');
      }
    } catch (error) {
      alert(`An error occurred. Please try again later: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-5 transition-shadow'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormInput
              label='Email'
              placeholder={t('username')}
              field={field}
              loading={loading}
            />
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormInput
              label='Password'
              type='password'
              placeholder={t('password')}
              field={field}
              loading={loading}
            />
          )}
        />
        <Button
          disabled={loading}
          className='ml-auto w-full bg-[#f1c40f] text-[#013880] hover:bg-[#f39c12] hover:text-[#013880]'
          type='submit'
        >
          {loading ? 'Loading...' : t('submit')}
        </Button>
        <div className='flex justify-between gap-2 pt-2 text-white'>
          <h3>{t('forgotPassword')}</h3>
          <LocaleSwitcher />
        </div>
      </form>
    </Form>
  );
}
