import React from 'react';
import { ProductClient } from './ProductClient';
import { PRODUCTS } from '@/data';
import { getWooProductBySlug, getWooProducts } from '@/lib/woocommerce';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localePath, localizedAlternates, stripHtml, truncate, getSiteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    let product = await getWooProductBySlug(slug);

    if (!product) {
        product = PRODUCTS.find(p => p.slug === slug) || null;
    }

    if (!product) return { title: 'Product Not Found' };

    const productName = locale === 'ar' && product.nameAr ? product.nameAr : product.name;
    const productDesc = locale === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;
    const description = truncate(stripHtml(productDesc), 160);
    const canonical = localePath(locale, `/product/${slug}`);

    return {
        title: productName,
        description,
        alternates: {
            canonical,
            ...localizedAlternates(`/product/${slug}`),
        },
        openGraph: {
            title: productName,
            description,
            url: canonical,
            images: [product.image],
        },
        twitter: {
            card: 'summary_large_image',
            title: productName,
            description,
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'product' });
    const siteUrl = getSiteUrl();

    let [product, allProducts] = await Promise.all([
        getWooProductBySlug(slug),
        getWooProducts(),
    ]);

    if (!product) {
        product = PRODUCTS.find(p => p.slug === slug) || null;
    }

    if (allProducts.length === 0) {
        allProducts = PRODUCTS;
    }

    if (!product) {
        return (
            <div className="py-20 text-center">
                <p>{t('notFound')}</p>
                <a href={`/${locale}/shop`} className="text-coral font-bold mt-4 inline-block">{t('backToShop')}</a>
            </div>
        );
    }

    const relatedProducts = allProducts.filter(p => p.id !== product!.id).slice(0, 4);

    const localizedName = locale === 'ar' && product.nameAr ? product.nameAr : product.name;
    const localizedDesc = locale === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: localizedName,
        description: stripHtml(localizedDesc),
        image: product.image,
        brand: {
            '@type': 'Brand',
            name: 'Luravie',
        },
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'EGP',
            availability: 'https://schema.org/InStock',
            url: `${siteUrl}/${locale}/product/${slug}`,
        },
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${siteUrl}/${locale}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Shop',
                item: `${siteUrl}/${locale}/shop`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: localizedName,
                item: `${siteUrl}/${locale}/product/${slug}`,
            },
        ],
    };

    return (
        <>
            <JsonLd data={productJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />
            <ProductClient product={product} relatedProducts={relatedProducts} />
        </>
    );
}
