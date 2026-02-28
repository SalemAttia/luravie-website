import React, { Suspense } from 'react';
import { ShopClient } from './ShopClient';
import { PRODUCTS } from '@/data';
import { getWooProducts } from '@/lib/woocommerce';
import { Metadata } from 'next';
import { localePath, localizedAlternates } from '@/lib/seo';

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
      ? 'تسوقي سوتيانات ولانجيري ومستلزمات نسائية أونلاين'
      : "Shop Women's Bras, Lingerie & Everyday Essentials Online",
    description: isAr
      ? 'تصفحي مجموعة لورافي من السوتيانات الفاخرة وأطقم اللانجيري والكلوت والشرابات النسائية. راحة يومية بجودة عالية. الدفع عند الاستلام وشحن سري في مصر.'
      : "Browse Luravie's collection of premium women's bras, lingerie sets, panties, and socks. Everyday comfort meets affordable luxury. Cash on delivery & discreet packaging across Egypt.",
    keywords: isAr
      ? ['سوتيانات', 'لانجيري', 'كلوت نسائي', 'شرابات نسائية', 'ملابس داخلية نسائية اونلاين', 'تسوق نسائي مصر']
      : ["women's bras", 'lingerie', 'panties', "women's socks", "women's underwear online", 'shop lingerie Egypt'],
    alternates: {
      canonical,
      ...localizedAlternates('/shop'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default async function ShopPage() {
    const wooProducts = await getWooProducts();
    const products = wooProducts.length > 0 ? wooProducts : PRODUCTS;

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading products...</div>}>
            <ShopClient initialProducts={products} />
        </Suspense>
    );
}
