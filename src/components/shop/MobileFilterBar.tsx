'use client';

import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SORT_OPTIONS } from './constants';

interface MobileFilterBarProps {
  activeFilterCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
  onOpenFilters: () => void;
}

export function MobileFilterBar({
  activeFilterCount,
  sortBy,
  onSortChange,
  onOpenFilters,
}: MobileFilterBarProps) {
  const t = useTranslations('shop');

  return (
    <div className="flex items-center gap-3 lg:hidden mb-4">
      <button
        onClick={onOpenFilters}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-teal/10 rounded-xl text-sm font-bold text-teal cursor-pointer hover:border-teal/20 transition-colors"
      >
        <SlidersHorizontal size={16} />
        {t('filters')}
        {activeFilterCount > 0 && (
          <span className="bg-coral text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>
      <select
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
        className="flex-1 px-4 py-2.5 bg-white border border-teal/10 rounded-xl text-sm font-bold text-teal cursor-pointer appearance-none hover:border-teal/20 transition-colors"
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            {t(opt.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
}
