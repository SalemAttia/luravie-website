"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, Link } from '@/i18n/routing';
import { ProductCard } from '@/components/product-card';
import { QuickSelectModal } from '@/components/quick-select-modal';
import { NotifyMeModal } from '@/components/notify-me-modal';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { FilterBottomSheet } from '@/components/shop/FilterBottomSheet';
import { ActiveFilters } from '@/components/shop/ActiveFilters';
import { EmptyState } from '@/components/shop/EmptyState';
import { MobileFilterBar } from '@/components/shop/MobileFilterBar';
import { useShopFilters } from '@/components/shop/useShopFilters';
import { CATEGORIES, SORT_OPTIONS } from '@/components/shop/constants';
import { useApp } from '@/context/AppContext';
import { Product } from '@/data';
import { useTranslations } from 'next-intl';

interface ShopClientProps {
    initialProducts: Product[];
}

export function ShopClient({ initialProducts }: ShopClientProps) {
    const router = useRouter();
    const t = useTranslations('shop');
    const tCommon = useTranslations('common');
    const { favorites, toggleFavorite, addToCart, buyNow } = useApp();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isQuickSelectOpen, setIsQuickSelectOpen] = useState(false);
    const [isNotifyMeOpen, setIsNotifyMeOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const {
        sortBy,
        setSortBy,
        selectedSizes,
        selectedColors,
        activeCategory,
        filteredProducts,
        activeFilterCount,
        hasActiveFilters,
        availableSizes,
        availableColors,
        toggleSize,
        toggleColor,
        removeSize,
        removeColor,
        clearAll,
    } = useShopFilters(initialProducts, favorites);

    const openQuickSelect = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickSelectOpen(true);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header: Title + Category Tabs */}
                <div className="mb-8">
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-4xl font-bold text-teal">
                            {activeCategory === 'Favorites' ? t('wishlist') : t('collection')}
                        </h1>
                        <p className="text-teal/60 mt-1">{t('subtitle')}</p>
                    </div>
                    <div className="flex bg-blush rounded-2xl p-1 overflow-x-auto w-fit">
                        {CATEGORIES.map(cat => (
                            <Link
                                key={cat}
                                href={`/shop?category=${cat}`}
                                className={`px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                                    activeCategory === cat
                                        ? 'bg-coral text-white shadow-lg'
                                        : 'text-teal/60 hover:text-teal'
                                }`}
                            >
                                {tCommon(`categories.${cat.toLowerCase()}`)}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Filter Bar */}
                <MobileFilterBar
                    activeFilterCount={activeFilterCount}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    onOpenFilters={() => setIsFilterOpen(true)}
                />

                {/* Active Filter Chips */}
                <ActiveFilters
                    selectedSizes={selectedSizes}
                    selectedColors={selectedColors}
                    onRemoveSize={removeSize}
                    onRemoveColor={removeColor}
                    onClearAll={clearAll}
                />

                {/* Main Content: Sidebar + Grid */}
                <div className="flex gap-8 lg:gap-10">
                    <FilterSidebar
                        sortBy={sortBy}
                        selectedSizes={selectedSizes}
                        selectedColors={selectedColors}
                        availableSizes={availableSizes}
                        availableColors={availableColors}
                        onSortChange={setSortBy}
                        onToggleSize={toggleSize}
                        onToggleColor={toggleColor}
                        onClearAll={clearAll}
                        hasActiveFilters={hasActiveFilters}
                    />

                    <div className="flex-1 min-w-0">
                        {/* Desktop Toolbar: Product Count + Sort */}
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <p className="text-sm text-teal/60 font-medium">
                                {t('productsCount', { count: filteredProducts.length })}
                            </p>
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="px-4 py-2 bg-white border border-teal/10 rounded-xl text-sm font-bold text-teal cursor-pointer appearance-none hover:border-teal/20 transition-colors"
                            >
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {t('sort')}: {t(opt.labelKey)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Product Grid or Empty State */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                                {filteredProducts.map(product => (
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
                        ) : (
                            <EmptyState onClearFilters={clearAll} />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Bottom Sheet */}
            <FilterBottomSheet
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                sortBy={sortBy}
                selectedSizes={selectedSizes}
                selectedColors={selectedColors}
                availableSizes={availableSizes}
                availableColors={availableColors}
                resultCount={filteredProducts.length}
                onSortChange={setSortBy}
                onToggleSize={toggleSize}
                onToggleColor={toggleColor}
                onClearAll={clearAll}
            />

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
        </motion.div>
    );
}
