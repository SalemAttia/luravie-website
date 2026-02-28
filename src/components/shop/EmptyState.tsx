'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  const t = useTranslations('shop');
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-rose flex items-center justify-center mb-6">
        <ShoppingBag size={28} className="text-teal/40" />
      </div>
      <h3 className="text-lg font-bold text-teal mb-2">
        {t('noProductsFound')}
      </h3>
      <p className="text-sm text-teal/60 mb-8 max-w-xs">
        {t('noProductsSubtitle')}
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClearFilters}
          className="px-6 py-3 bg-coral text-white rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          {t('clearFilters')}
        </button>
        <button
          onClick={() => router.push('/shop?category=All' as any)}
          className="px-6 py-3 bg-white border border-teal/10 text-teal rounded-2xl font-bold text-sm hover:border-teal/20 transition-colors cursor-pointer"
        >
          {t('browseAll')}
        </button>
      </div>
    </div>
  );
}
