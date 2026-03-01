"use client";

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { ProductCard } from '@/components/product-card';
import { QuickSelectModal } from '@/components/quick-select-modal';
import { NotifyMeModal } from '@/components/notify-me-modal';
import { useApp } from '@/context/AppContext';
import { Product } from '@/data';
import { useTranslations } from 'next-intl';

interface FeaturedProductsClientProps {
    initialProducts: Product[];
}

export function FeaturedProductsClient({ initialProducts }: FeaturedProductsClientProps) {
    const t = useTranslations('home');
    const router = useRouter();
    const { favorites, toggleFavorite, addToCart, buyNow } = useApp();
    const [isQuickSelectOpen, setIsQuickSelectOpen] = useState(false);
    const [isNotifyMeOpen, setIsNotifyMeOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const openQuickSelect = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickSelectOpen(true);
    };

    return (
        <section className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-teal mb-4">{t('sectionTitle')}</h2>
                    <p className="text-teal/70 text-lg max-w-2xl mx-auto">
                        {t('sectionSubtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
                    {initialProducts.slice(0, 3).map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            href={`/product/${product.slug}`}
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={(e) => toggleFavorite(product.id, e)}
                            onAddToCart={addToCart}
                            onBuyNow={(p, s, c, v) => {
                                buyNow(p, s, c, v);
                                router.push('/checkout' as any);
                            }}
                            onOpenQuickSelect={() => openQuickSelect(product)}
                            onNotifyMe={(p) => { setSelectedProduct(p); setIsNotifyMeOpen(true); }}
                        />
                    ))}
                </div>
            </div>

            <QuickSelectModal
                isOpen={isQuickSelectOpen}
                onClose={() => setIsQuickSelectOpen(false)}
                product={selectedProduct}
                onAddToCart={addToCart}
                onBuyNow={(p, s, c, v) => {
                    buyNow(p, s, c, v);
                    router.push('/checkout' as any);
                }}
                onNotifyMe={(p) => { setSelectedProduct(p); setIsNotifyMeOpen(true); }}
            />

            <NotifyMeModal
                isOpen={isNotifyMeOpen}
                onClose={() => setIsNotifyMeOpen(false)}
                product={selectedProduct}
            />
        </section>
    );
}
