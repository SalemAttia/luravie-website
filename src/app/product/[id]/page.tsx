"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProductDetail } from '@/components/product-detail';
import { ProductCard } from '@/components/product-card';
import { useApp } from '@/context/AppContext';
import { PRODUCTS } from '@/data';

export default function ProductPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const { favorites, toggleFavorite, addToCart, buyNow } = useApp();

    const product = PRODUCTS.find(p => p.id === id);

    const navigate = (path: string) => {
        router.push(path);
    };

    if (!product) {
        return (
            <div className="py-20 text-center">
                <p>Product not found.</p>
                <button onClick={() => navigate('/shop')} className="text-coral font-bold mt-4">Back to Shop</button>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProductDetail
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={(e) => toggleFavorite(product.id, e)}
                onBack={() => navigate('/shop')}
                onAddToCart={addToCart}
                onBuyNow={(p, s, c) => {
                    buyNow(p, s, c);
                    navigate('/checkout');
                }}
            />
            <section className="py-20 border-t border-teal/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-teal mb-10">You might also like</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                isFavorite={favorites.includes(p.id)}
                                onToggleFavorite={(e) => toggleFavorite(p.id, e)}
                                onAddToCart={addToCart}
                                onBuyNow={(p, s, c) => {
                                    buyNow(p, s, c);
                                    navigate('/checkout');
                                }}
                                onClick={() => navigate(`/product/${p.id}`)}
                                onOpenQuickSelect={() => { }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
