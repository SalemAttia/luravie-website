import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { localePath, localizedAlternates, getSiteUrl, ARABIC_BRAND_VARIANTS } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import { JsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = localePath(locale, '/about');
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'عن لوراڤيه (Luravie) – مستلزمات نسائية يومية فاخرة في مصر'
      : "About Luravie – Premium Women's Everyday Essentials in Egypt",
    description: isAr
      ? 'لوراڤيه (لورافي - Luravie) تقدم مستلزمات نسائية يومية بجودة عالية مصممة للراحة والثقة. اكتشفي التزامنا بالأقمشة الفاخرة والأسعار المناسبة والخدمة السرية في مصر.'
      : "Luravie offers premium quality women's everyday essentials designed for comfort and confidence. Discover our commitment to quality fabrics, affordable luxury, and discreet service in Egypt.",
    keywords: isAr
      ? [...ARABIC_BRAND_VARIANTS, 'Luravie', 'عن لوراڤيه', 'عن لورافي', 'من نحن لوراڤيه', 'من نحن لورافي', 'مستلزمات نسائية مصر']
      : ['Luravie', 'about Luravie', 'Luravie Egypt', "women's essentials Egypt", 'Luravie story'],
    alternates: {
      canonical,
      ...localizedAlternates('/about'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const isAr = locale === 'ar';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'عن لورافي' : 'About',
        item: `${siteUrl}/${locale}/about`,
      },
    ],
  };

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: isAr ? 'عن لورافي' : 'About Luravie',
    description: isAr
      ? 'لورافي تقدم مستلزمات نسائية يومية بجودة عالية مصممة للراحة والثقة.'
      : "Luravie offers premium quality women's everyday essentials designed for comfort and confidence.",
    url: `${siteUrl}/${locale}/about`,
    inLanguage: isAr ? 'ar' : 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Luravie',
      url: siteUrl,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={aboutPageJsonLd} />
      <AboutClient />
    </>
  );
}
