import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/data';

export function useShopFilters(initialProducts: Product[], favorites: string[]) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const [sortBy, setSortBy] = useState('Newest');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleSize = useCallback((size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  }, []);

  const toggleColor = useCallback((color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  }, []);

  const removeSize = useCallback((size: string) => {
    setSelectedSizes(prev => prev.filter(s => s !== size));
  }, []);

  const removeColor = useCallback((color: string) => {
    setSelectedColors(prev => prev.filter(c => c !== color));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('Newest');
  }, []);

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

    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeCategory, favorites, sortBy, selectedSizes, selectedColors, initialProducts]);

  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    for (const p of initialProducts) {
      for (const s of p.sizes) sizeSet.add(s);
    }
    return Array.from(sizeSet);
  }, [initialProducts]);

  const availableColors = useMemo(() => {
    const colorMap = new Map<string, string>();
    for (const p of initialProducts) {
      for (const c of p.colors) {
        if (!colorMap.has(c.name)) colorMap.set(c.name, c.hex);
      }
    }
    return Array.from(colorMap, ([name, hex]) => ({ name, hex }));
  }, [initialProducts]);

  const activeFilterCount = selectedSizes.length + selectedColors.length + (sortBy !== 'Newest' ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

  return {
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
  };
}
