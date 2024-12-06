import { Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

import '@/styles/globals.css';

import { ThemeProvider } from '@/components/ThemeProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

type RootLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
