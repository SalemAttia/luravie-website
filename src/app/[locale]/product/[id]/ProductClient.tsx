"use client";

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ProductDetail } from '@/components/product-detail';
import { ProductCard } from '@/components/product-card';
import { QuickSelectModal } from '@/components/quick-select-modal';
import { useApp } from '@/context/AppContext';
import { Product, PRODUCTS } from '@/data';
import { useTranslations, useLocale } from 'next-intl';

interface ProductClientProps {
    product: Product;
    relatedProducts: Product[];
}

export function ProductClient({ product, relatedProducts }: ProductClientProps) {
    const t = useTranslations('product');
    const locale = useLocale();
    const router = useRouter();
    const { favorites, toggleFavorite, addToCart, buyNow } = useApp();
    const [isQuickSelectOpen, setIsQuickSelectOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const navigate = (path: string) => {
        router.push(path as any);
    };

    const openQuickSelect = (p: Product) => {
        setSelectedProduct(p);
        setIsQuickSelectOpen(true);
    };

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
            <section className="py-10 md:py-20 border-t border-teal/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className={`text-2xl font-bold text-teal mb-10 ${locale === 'ar' ? 'text-right' : ''}`}>{t('related')}</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
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
                                onOpenQuickSelect={() => openQuickSelect(p)}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <QuickSelectModal
                isOpen={isQuickSelectOpen}
                onClose={() => setIsQuickSelectOpen(false)}
                product={selectedProduct}
                onAddToCart={addToCart}
                onBuyNow={(p, s, c) => {
                    buyNow(p, s, c);
                    navigate('/checkout');
                }}
            />
        </motion.div>
    );
}
