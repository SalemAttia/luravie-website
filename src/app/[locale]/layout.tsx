import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "@/styles/fonts.css";
import "@/styles/theme.css";
import "@/styles/index.css";
import "@/styles/tailwind.css";

import { AppProvider } from "@/context/AppContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Luravie',
    default: 'Luravie | Your Confidence Starts Within',
  },
  description: "Shop the latest in bras, lingerie, and more at Luravie. High-quality women's fashion designed for confidence.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://luravie.com',
    siteName: 'Luravie',
    images: [{
      url: '/og-image.jpg', // User should provide this or I'll generate one if needed
      width: 1200,
      height: 630,
      alt: 'Luravie'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luravie',
    description: "Shop the latest in bras, lingerie, and more.",
    images: ['/og-image.jpg'],
  }
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <Toaster richColors />
            <MainLayout>
              {children}
            </MainLayout>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
