import React, { Suspense } from 'react';
import { ShopClient } from './ShopClient';
import { PRODUCTS } from '@/data';
import { getWooProducts } from '@/lib/woocommerce';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shop All Collections',
    description: 'Browse our exclusive collection of women\'s fashion, including luxury bras, lingerie, and accessories.',
};

export default async function ShopPage() {
    const wooProducts = await getWooProducts();
    const products = wooProducts.length > 0 ? wooProducts : PRODUCTS;

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading products...</div>}>
            <ShopClient initialProducts={products} />
        </Suspense>
    );
}
