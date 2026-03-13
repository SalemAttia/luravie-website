import React, { Suspense } from 'react';
import { ShopClient } from './ShopClient';
import { PRODUCTS } from '@/data';
import { getWooProducts } from '@/lib/woocommerce';
import { Metadata } from 'next';
import { localePath, localizedAlternates, getSiteUrl, ARABIC_BRAND_VARIANTS } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = localePath(locale, '/shop');
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'تسوقي من لوراڤيه (Luravie) – سوتيانات ولانجيري ومستلزمات نسائية أونلاين'
      : "Shop Luravie – Women's Bras, Lingerie & Everyday Essentials Online",
    description: isAr
      ? 'تصفحي مجموعة لوراڤيه (لورافي - Luravie) من السوتيانات الفاخرة وأطقم اللانجيري والكلوت والشرابات النسائية. راحة يومية بجودة عالية. الدفع عند الاستلام وشحن سري في مصر.'
      : "Browse Luravie's collection of premium women's bras, lingerie sets, panties, and socks. Everyday comfort meets affordable luxury. Cash on delivery & discreet packaging across Egypt.",
    keywords: isAr
      ? [...ARABIC_BRAND_VARIANTS, 'Luravie', 'متجر لوراڤيه', 'متجر لورافي', 'سوتيانات', 'لانجيري', 'كلوت نسائي', 'شرابات نسائية', 'ملابس داخلية نسائية اونلاين', 'تسوق نسائي مصر']
      : ['Luravie shop', 'Luravie store', "women's bras", 'lingerie', 'panties', "women's socks", "women's underwear online", 'shop lingerie Egypt'],
    alternates: {
      canonical,
      ...localizedAlternates('/shop'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const siteUrl = getSiteUrl();
    const isAr = locale === 'ar';
    const wooProducts = await getWooProducts();
    const products = wooProducts.length > 0 ? wooProducts : PRODUCTS;

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
          name: isAr ? 'المتجر' : 'Shop',
          item: `${siteUrl}/${locale}/shop`,
        },
      ],
    };

    const collectionPageJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: isAr ? 'متجر لورافي' : 'Luravie Shop',
      description: isAr
        ? 'تصفحي مجموعة لورافي من المستلزمات النسائية اليومية'
        : "Browse Luravie's collection of women's everyday essentials",
      url: `${siteUrl}/${locale}/shop`,
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
            <JsonLd data={collectionPageJsonLd} />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading products...</div>}>
                <ShopClient initialProducts={products} />
            </Suspense>
        </>
    );
}
