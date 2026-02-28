'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { SORT_OPTIONS } from './constants';

interface FilterSidebarProps {
  sortBy: string;
  selectedSizes: string[];
  selectedColors: string[];
  availableSizes: string[];
  availableColors: { name: string; hex: string }[];
  onSortChange: (value: string) => void;
  onToggleSize: (size: string) => void;
  onToggleColor: (color: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export function FilterSidebar({
  sortBy,
  selectedSizes,
  selectedColors,
  availableSizes,
  availableColors,
  onSortChange,
  onToggleSize,
  onToggleColor,
  onClearAll,
  hasActiveFilters,
}: FilterSidebarProps) {
  const t = useTranslations('shop');

  return (
    <aside className="hidden lg:block w-[260px] shrink-0">
      <div className="sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto bg-white/50 rounded-2xl border border-teal/5 p-5">
        <Accordion type="multiple" defaultValue={['sort', 'sizes', 'colors']}>
          {/* Sort */}
          <AccordionItem value="sort" className="border-teal/5">
            <AccordionTrigger className="text-xs font-bold text-teal/40 uppercase tracking-[0.2em] hover:no-underline">
              {t('sortBy')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1.5">
                {SORT_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-start transition-all cursor-pointer ${
                      sortBy === option.value
                        ? 'bg-white border-teal text-teal shadow-sm'
                        : 'bg-white/50 border-teal/5 text-teal/60 hover:border-teal/20'
                    }`}
                  >
                    <span className="font-bold text-sm">{t(option.labelKey)}</span>
                    {sortBy === option.value && <Check size={14} />}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Sizes */}
          <AccordionItem value="sizes" className="border-teal/5">
            <AccordionTrigger className="text-xs font-bold text-teal/40 uppercase tracking-[0.2em] hover:no-underline">
              {t('sizes')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => onToggleSize(size)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      selectedSizes.includes(size)
                        ? 'bg-teal text-white border-teal shadow-md shadow-teal/10'
                        : 'bg-white/50 border-teal/5 text-teal/60 hover:border-teal/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Colors */}
          <AccordionItem value="colors" className="border-b-0">
            <AccordionTrigger className="text-xs font-bold text-teal/40 uppercase tracking-[0.2em] hover:no-underline">
              {t('colors')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-3">
                {availableColors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => onToggleColor(color.name)}
                    className="group relative flex flex-col items-center gap-1.5 cursor-pointer"
                  >
                    <div
                      className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColors.includes(color.name)
                          ? 'border-teal scale-110'
                          : 'border-transparent group-hover:border-teal/20'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColors.includes(color.name) && (
                        <div className="absolute inset-0 flex items-center justify-center text-white mix-blend-difference">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-bold text-teal/50 leading-tight text-center max-w-[48px]">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="w-full mt-4 py-2.5 text-sm font-bold text-coral hover:underline cursor-pointer"
          >
            {t('clearAll')}
          </button>
        )}
      </div>
    </aside>
  );
}
