'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ActiveFiltersProps {
  selectedSizes: string[];
  selectedColors: string[];
  onRemoveSize: (size: string) => void;
  onRemoveColor: (color: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  selectedSizes,
  selectedColors,
  onRemoveSize,
  onRemoveColor,
  onClearAll,
}: ActiveFiltersProps) {
  const t = useTranslations('shop');

  if (selectedSizes.length === 0 && selectedColors.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <AnimatePresence mode="popLayout">
        {selectedSizes.map(size => (
          <motion.button
            key={`size-${size}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => onRemoveSize(size)}
            className="inline-flex items-center gap-1.5 bg-rose text-teal rounded-full px-3 py-1.5 text-xs font-bold cursor-pointer hover:bg-rose/80 transition-colors"
          >
            {t('size')}: {size}
            <X size={12} />
          </motion.button>
        ))}
        {selectedColors.map(color => (
          <motion.button
            key={`color-${color}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => onRemoveColor(color)}
            className="inline-flex items-center gap-1.5 bg-rose text-teal rounded-full px-3 py-1.5 text-xs font-bold cursor-pointer hover:bg-rose/80 transition-colors"
          >
            {t('color')}: {color}
            <X size={12} />
          </motion.button>
        ))}
      </AnimatePresence>
      <button
        onClick={onClearAll}
        className="text-xs font-bold text-coral hover:underline cursor-pointer ms-1"
      >
        {t('clearAll')}
      </button>
    </div>
  );
}
