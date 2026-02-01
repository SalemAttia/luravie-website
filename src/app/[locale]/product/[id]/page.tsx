"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ProductDetail } from '@/components/product-detail';
import { ProductCard } from '@/components/product-card';
import { useApp } from '@/context/AppContext';
import { PRODUCTS } from '@/data';
import { useTranslations, useLocale } from 'next-intl';

export default function ProductPage() {
    const t = useTranslations('product');
    const locale = useLocale();
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const { favorites, toggleFavorite, addToCart, buyNow } = useApp();

    const product = PRODUCTS.find(p => p.id === id);

    const navigate = (path: string) => {
        router.push(path as any);
    };

    if (!product) {
        return (
            <div className="py-20 text-center" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                <p>{t('notFound')}</p>
                <button onClick={() => navigate('/shop')} className="text-coral font-bold mt-4 cursor-pointer">{t('backToShop')}</button>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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
                    <h2 className={`text-2xl font-bold text-teal mb-10 ${locale === 'ar' ? 'text-right' : ''}`}>{t('related')}</h2>
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
                                onClick={() => navigate(`/product/${p.id}` as any)}
                                onOpenQuickSelect={() => { }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
