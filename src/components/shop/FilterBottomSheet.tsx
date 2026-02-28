'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { SORT_OPTIONS } from './constants';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: string;
  selectedSizes: string[];
  selectedColors: string[];
  availableSizes: string[];
  availableColors: { name: string; hex: string }[];
  resultCount: number;
  onSortChange: (value: string) => void;
  onToggleSize: (size: string) => void;
  onToggleColor: (color: string) => void;
  onClearAll: () => void;
}

export function FilterBottomSheet({
  isOpen,
  onClose,
  sortBy,
  selectedSizes,
  selectedColors,
  availableSizes,
  availableColors,
  resultCount,
  onSortChange,
  onToggleSize,
  onToggleColor,
  onClearAll,
}: FilterBottomSheetProps) {
  const t = useTranslations('shop');

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            className="fixed bottom-0 inset-x-0 max-h-[85vh] bg-blush rounded-t-3xl shadow-2xl z-[70] flex flex-col overflow-hidden"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-teal/20" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4 pt-2 flex justify-between items-center border-b border-teal/5">
              <h2 className="text-lg font-bold text-teal">{t('filters')}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-teal/5 rounded-full transition-colors text-teal cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <Accordion type="multiple" defaultValue={['sort', 'sizes', 'colors']}>
                {/* Sort */}
                <AccordionItem value="sort" className="border-teal/5">
                  <AccordionTrigger className="text-xs font-bold text-teal/40 uppercase tracking-[0.2em] hover:no-underline">
                    {t('sortBy')}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {SORT_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          onClick={() => onSortChange(option.value)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border text-start transition-all cursor-pointer ${
                            sortBy === option.value
                              ? 'bg-white border-teal text-teal shadow-sm'
                              : 'bg-white/50 border-teal/5 text-teal/60 hover:border-teal/20'
                          }`}
                        >
                          <span className="font-bold text-sm">{t(option.labelKey)}</span>
                          {sortBy === option.value && <Check size={16} />}
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
                          className={`px-4 py-2 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
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
                    <div className="flex flex-wrap gap-4">
                      {availableColors.map(color => (
                        <button
                          key={color.name}
                          onClick={() => onToggleColor(color.name)}
                          className="group relative flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <div
                            className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                              selectedColors.includes(color.name)
                                ? 'border-teal scale-110'
                                : 'border-transparent group-hover:border-teal/20'
                            }`}
                          >
                            <div
                              className="w-7 h-7 rounded-full shadow-inner"
                              style={{ backgroundColor: color.hex }}
                            />
                            {selectedColors.includes(color.name) && (
                              <div className="absolute inset-0 flex items-center justify-center text-white mix-blend-difference">
                                <Check size={16} strokeWidth={3} />
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-teal/60">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white border-t border-teal/5 flex gap-4">
              <button
                onClick={onClearAll}
                className="flex-1 py-4 text-teal font-bold text-sm hover:underline cursor-pointer"
              >
                {t('clearAll')}
              </button>
              <button
                onClick={onClose}
                className="flex-[2] py-4 bg-teal text-white rounded-2xl font-bold shadow-lg shadow-teal/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                {t('showResults')} ({resultCount})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(content, document.body);
}
