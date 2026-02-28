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
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  const isAr = locale === 'ar';

  const title = isAr
    ? 'لورافي | مستلزمات نسائية يومية – سوتيانات ولانجيري في مصر'
    : "Luravie | Women's Everyday Essentials – Bras, Lingerie & More in Egypt";

  const description = isAr
    ? 'تسوقي أفضل السوتيانات واللانجيري والمستلزمات النسائية اليومية من لورافي. جودة عالية بأسعار مناسبة مع الدفع عند الاستلام وشحن سري ومجاني في جميع أنحاء مصر.'
    : "Shop premium women's bras, lingerie, and everyday essentials at Luravie. Affordable luxury with cash on delivery, discreet packaging, and free shipping across Egypt.";

  const keywords = isAr
    ? [
        'لورافي',
        'ملابس داخلية نسائية',
        'ملابس داخلية نسائية مصر',
        'سوتيان',
        'سوتيانات',
        'لانجيري',
        'لانجيري مصر',
        'شراء سوتيان اون لاين',
        'كلوت نسائي',
        'ملابس داخلية بالدفع عند الاستلام',
        'شحن سري ملابس داخلية',
        'سوتيان سيملس',
        'سوتيان مريح',
        'طقم لانجيري',
        'شرابات نسائية',
        'ملابس داخلية جودة عالية',
        'سوتيان يومي',
        'ملابس داخلية اونلاين مصر',
        'لانجيري بسعر مناسب',
        'مستلزمات نسائية يومية',
        'سوتيان قطن',
        'شحن مجاني ملابس داخلية',
        'ملابس نسائية مصر',
        'تسوق نسائي اون لاين مصر',
      ]
    : [
        'Luravie',
        "women's underwear Egypt",
        'buy bras online Egypt',
        'lingerie Egypt',
        "women's bras Egypt",
        'seamless bra Egypt',
        'cotton briefs women',
        'everyday bra',
        'comfortable bra Egypt',
        'affordable lingerie Egypt',
        "women's essentials Egypt",
        'panties online Egypt',
        "women's socks Egypt",
        'lingerie set Egypt',
        'cash on delivery underwear Egypt',
        'discreet packaging lingerie Egypt',
        'free shipping underwear Egypt',
        'try before you buy lingerie',
        'premium bras Egypt',
        "women's everyday essentials",
        'online lingerie store Egypt',
        "women's intimate wear Egypt",
        'bra shop Egypt',
        'affordable bras Egypt',
        "women's underwear online",
        'women undergarments Egypt',
      ];

  return {
    metadataBase: getMetadataBase(),
    applicationName: isAr ? 'لورافي' : 'Luravie',
    title: {
      template: isAr ? '%s | لورافي' : '%s | Luravie',
      default: title,
    },
    description,
    keywords,
    authors: [{ name: 'Luravie', url: siteUrl }],
    creator: 'Luravie',
    publisher: 'Luravie',
    category: isAr ? 'ملابس داخلية نسائية' : "Women's Underwear & Lingerie",
    openGraph: {
      type: 'website',
      locale: ogLocaleFromLocale(locale),
      alternateLocale: isAr ? 'en_US' : 'ar_AR',
      url: `${siteUrl}/${locale}`,
      siteName: isAr ? 'لورافي' : 'Luravie',
      title,
      description,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: isAr
            ? 'لورافي – مستلزمات نسائية يومية فاخرة في مصر'
            : "Luravie – Premium Women's Everyday Essentials in Egypt",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr ? 'لورافي | مستلزمات نسائية يومية' : "Luravie | Women's Everyday Essentials",
      description: isAr
        ? 'سوتيانات ولانجيري ومستلزمات نسائية بجودة عالية. الدفع عند الاستلام وشحن سري في مصر.'
        : "Premium women's bras, lingerie & essentials. Cash on delivery & discreet packaging across Egypt.",
      images: ['/twitter-image'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': 'EG',
      'geo.country': 'EG',
      'content-language': isAr ? 'ar-EG' : 'en-EG',
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
    '@type': 'OnlineStore',
    name: 'Luravie',
    alternateName: 'لورافي',
    url: siteUrl,
    logo: `${siteUrl}/opengraph-image`,
    description: locale === 'ar'
      ? 'متجر مستلزمات نسائية يومية فاخرة – سوتيانات، لانجيري، كلوت وشرابات في مصر'
      : "Premium women's everyday essentials – Bras, lingerie, panties & socks in Egypt",
    currenciesAccepted: 'EGP',
    paymentAccepted: 'Cash on Delivery',
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201505555388',
      email: 'support@luravie.com',
      contactType: 'customer service',
      areaServed: 'EG',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'ar' ? 'مستلزمات نسائية' : "Women's Essentials",
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: locale === 'ar' ? 'سوتيانات' : 'Bras',
          url: `${siteUrl}/${locale}/shop?category=bra`,
        },
        {
          '@type': 'OfferCatalog',
          name: locale === 'ar' ? 'لانجيري' : 'Lingerie',
          url: `${siteUrl}/${locale}/shop?category=lingerie`,
        },
        {
          '@type': 'OfferCatalog',
          name: locale === 'ar' ? 'كلوت' : 'Panties',
          url: `${siteUrl}/${locale}/shop?category=pants`,
        },
        {
          '@type': 'OfferCatalog',
          name: locale === 'ar' ? 'شرابات' : 'Socks',
          url: `${siteUrl}/${locale}/shop?category=socks`,
        },
      ],
    },
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <JsonLd data={organizationJsonLd} />
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <Toaster richColors />
            <MainLayout>
              {children}
            </MainLayout>
          </AppProvider>
        </NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
