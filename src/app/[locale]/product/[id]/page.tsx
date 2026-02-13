import React from 'react';
import { ProductClient } from './ProductClient';
import { PRODUCTS } from '@/data';
import { getWooProductById, getWooProducts } from '@/lib/woocommerce';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localePath, localizedAlternates, stripHtml, truncate, getSiteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }): Promise<Metadata> {
    const { id, locale } = await params;
    let product = await getWooProductById(id);

    if (!product) {
        product = PRODUCTS.find(p => p.id === id) || null;
    }

    if (!product) return { title: 'Product Not Found' };

    const description = truncate(stripHtml(product.description), 160);
    const canonical = localePath(locale, `/product/${id}`);

    return {
        title: product.name,
        description,
        alternates: {
            canonical,
            ...localizedAlternates(`/product/${id}`),
        },
        openGraph: {
            title: product.name,
            description,
            url: canonical,
            images: [product.image],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description,
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'product' });
    const siteUrl = getSiteUrl();

    let product = await getWooProductById(id);
    let allProducts = await getWooProducts();

    if (!product) {
        product = PRODUCTS.find(p => p.id === id) || null;
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

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: stripHtml(product.description),
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
            url: `${siteUrl}/${locale}/product/${id}`,
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
                name: product.name,
                item: `${siteUrl}/${locale}/product/${id}`,
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
