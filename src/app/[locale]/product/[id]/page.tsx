import React from 'react';
import { ProductClient } from './ProductClient';
import { PRODUCTS } from '@/data';
import { getWooProductById, getWooProducts } from '@/lib/woocommerce';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

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
