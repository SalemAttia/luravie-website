import React from 'react';
import { ProductClient } from './ProductClient';
import { PRODUCTS } from '@/data';
import { getWooProductById, getWooProducts } from '@/lib/woocommerce';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }): Promise<Metadata> {
    const { id } = await params;
    let product = await getWooProductById(id);

    if (!product) {
        product = PRODUCTS.find(p => p.id === id) || null;
    }

    if (!product) return { title: 'Product Not Found' };

    return {
        title: product.name,
        description: product.description.substring(0, 160).replace(/<[^>]*>?/gm, ''), // Stripping HTML
        openGraph: {
            title: product.name,
            description: product.description.substring(0, 160).replace(/<[^>]*>?/gm, ''),
            images: [product.image],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.description.substring(0, 160).replace(/<[^>]*>?/gm, ''),
            images: [product.image],
        }
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'product' });

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

    return <ProductClient product={product} relatedProducts={relatedProducts} />;
}
