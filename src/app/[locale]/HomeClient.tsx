"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '@/i18n/routing';
import { Hero, CategorySection } from '@/components/hero-and-cats';
import { ProductCard } from '@/components/product-card';
import { TrustSection } from '@/components/trust-section';
import { QuickSelectModal } from '@/components/quick-select-modal';
import { useApp } from '@/context/AppContext';
import { Product } from '@/data';
import { useTranslations } from 'next-intl';

interface HomeClientProps {
    initialProducts: Product[];
}

export function HomeClient({ initialProducts }: HomeClientProps) {
    const t = useTranslations('home');
    const router = useRouter();
    const { favorites, toggleFavorite, addToCart, buyNow } = useApp();
    const [isQuickSelectOpen, setIsQuickSelectOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const navigate = (path: string) => {
        router.push(path as any);
    };

    const openQuickSelect = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickSelectOpen(true);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero
                onShopNow={() => navigate('/shop')}
                onAboutClick={() => navigate('/about')}
            />
            <CategorySection onNavigate={(cat) => navigate(`/shop?category=${cat}`)} />

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-teal mb-4">{t('sectionTitle')}</h2>
                        <p className="text-teal/70 text-lg max-w-2xl mx-auto">
                            {t('sectionSubtitle')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {initialProducts.slice(0, 3).map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isFavorite={favorites.includes(product.id)}
                                onToggleFavorite={(e) => toggleFavorite(product.id, e)}
                                onAddToCart={addToCart}
                                onBuyNow={(p, s, c) => {
                                    buyNow(p, s, c);
                                    navigate('/checkout');
                                }}
                                onClick={() => navigate(`/product/${product.id}`)}
                                onOpenQuickSelect={() => openQuickSelect(product)}
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

            <TrustSection />
        </motion.div>
    );
}
