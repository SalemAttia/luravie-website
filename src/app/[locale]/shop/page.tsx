import React, { Suspense } from 'react';
import { ShopClient } from './ShopClient';
import { PRODUCTS } from '@/data';
import { getWooProducts } from '@/lib/woocommerce';

export default async function ShopPage() {
    const wooProducts = await getWooProducts();
    const products = wooProducts.length > 0 ? wooProducts : PRODUCTS;

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading products...</div>}>
            <ShopClient initialProducts={products} />
        </Suspense>
    );
}
