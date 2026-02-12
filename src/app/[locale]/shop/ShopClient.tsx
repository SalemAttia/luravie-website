"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { FilterDrawer } from '@/components/filter-drawer';
import { QuickSelectModal } from '@/components/quick-select-modal';
import { useApp } from '@/context/AppContext';
import { Product } from '@/data';
import { useTranslations, useLocale } from 'next-intl';

interface ShopClientProps {
    initialProducts: Product[];
}

export function ShopClient({ initialProducts }: ShopClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations('shop');
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const { favorites, toggleFavorite, addToCart, buyNow } = useApp();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isQuickSelectOpen, setIsQuickSelectOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Newest');
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const activeCategory = searchParams.get('category') || 'All';

    const navigate = (path: string) => {
        router.push(path as any);
    };

    const openQuickSelect = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickSelectOpen(true);
    };

    const filteredProducts = useMemo(() => {
        let result = [...initialProducts];

        if (activeCategory === 'Favorites') {
            result = result.filter(p => favorites.includes(p.id));
        } else if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (selectedSizes.length > 0) {
            result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
        }

        if (selectedColors.length > 0) {
            result = result.filter(p => p.colors.some(c => selectedColors.includes(c.name)));
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);

        return result;
    }, [activeCategory, favorites, searchQuery, sortBy, selectedSizes, selectedColors, initialProducts]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 ${locale === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                    <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
                        <h1 className="text-2xl md:text-4xl font-bold text-teal">
                            {activeCategory === 'Favorites' ? t('wishlist') : t('collection')}
                        </h1>
                        <p className="text-teal/60">{t('subtitle')}</p>
                    </div>
                    <div className={`flex flex-wrap gap-2 md:gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex bg-blush rounded-2xl p-1 overflow-x-auto ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                            {['All', 'Bra', 'Pants', 'Lingerie', 'Socks'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => navigate(`/shop?category=${cat}`)}
                                    className={`px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${activeCategory === cat ? 'bg-coral text-white shadow-lg' : 'text-teal/60 hover:text-teal'
                                        }`}
                                >
                                    {tCommon(`categories.${cat.toLowerCase()}`)}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className={`px-3 py-2 md:px-5 md:py-3 bg-blush border border-teal/10 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                            <SlidersHorizontal size={18} /> {t('filters')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
                    {filteredProducts.map(product => (
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

            <FilterDrawer
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                sortBy={sortBy}
                setSortBy={setSortBy}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
            />
        </motion.div>
    );
}
