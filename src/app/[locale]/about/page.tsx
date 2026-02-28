import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { localePath, localizedAlternates } from '@/lib/seo';

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
      ? 'عن لورافي – مستلزمات نسائية يومية فاخرة في مصر'
      : "About Luravie – Premium Women's Everyday Essentials in Egypt",
    description: isAr
      ? 'لورافي تقدم مستلزمات نسائية يومية بجودة عالية مصممة للراحة والثقة. اكتشفي التزامنا بالأقمشة الفاخرة والأسعار المناسبة والخدمة السرية في مصر.'
      : "Luravie offers premium quality women's everyday essentials designed for comfort and confidence. Discover our commitment to quality fabrics, affordable luxury, and discreet service in Egypt.",
    alternates: {
      canonical,
      ...localizedAlternates('/about'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
