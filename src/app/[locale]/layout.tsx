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
import { getMetadataBase, getSiteUrl, ogLocaleFromLocale } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: getMetadataBase(),
    applicationName: 'Luravie',
    title: {
      template: '%s | Luravie',
      default: 'Luravie | Your Confidence Starts Within',
    },
    description:
      "Shop the latest in bras, lingerie, and more at Luravie. High-quality women's fashion designed for confidence.",
    keywords: ['Luravie', 'bras', 'lingerie', "women's fashion", 'underwear', 'shop'],
    openGraph: {
      type: 'website',
      locale: ogLocaleFromLocale(locale),
      url: `${siteUrl}/${locale}`,
      siteName: 'Luravie',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Luravie',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Luravie',
      description: 'Shop the latest in bras, lingerie, and more.',
      images: ['/twitter-image'],
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(googleVerification
      ? {
          verification: {
            google: googleVerification,
          },
        }
      : {}),
  };
}

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

  const siteUrl = getSiteUrl();

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Luravie',
    url: siteUrl,
    logo: `${siteUrl}/opengraph-image`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201505555388',
      email: 'support@luravie.com',
      contactType: 'customer service',
      areaServed: 'EG',
      availableLanguage: ['English', 'Arabic'],
    },
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.className} antialiased`}>
        <JsonLd data={organizationJsonLd} />
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
