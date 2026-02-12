import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
}

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '32A', '34A', '32B', '34B', '36B', '32C', '34C', '36C', '38C', 'One Size'];
const COMMON_COLORS = [
  { name: 'Midnight Black', hex: '#1A1A1A' },
  { name: 'Soft Nude', hex: '#E3C5AF' },
  { name: 'Luravie Teal', hex: '#5B7B7C' },
  { name: 'Soft Coral', hex: '#E59595' },
  { name: 'Pearl Rose', hex: '#FCE4E4' },
];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  sortBy,
  setSortBy,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
}) => {
  const t = useTranslations('shop');
  const locale = useLocale();

  const sortOptions = [
    { label: t('newest'), value: 'Newest' },
    { label: t('priceLowHigh'), value: 'Price: Low to High' },
    { label: t('priceHighLow'), value: 'Price: High to Low' },
  ];

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const clearAll = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('Newest');
  };

  return (
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
            initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed ${locale === 'ar' ? 'left-0' : 'right-0'} top-0 h-full w-full max-w-sm bg-blush shadow-2xl z-[70] overflow-hidden flex flex-col`}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className={`p-6 border-b border-teal/10 flex justify-between items-center ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
                <h2 className="text-xl font-bold text-teal">{t('filters')}</h2>
                <p className="text-xs text-teal/60 font-medium">
                  {locale === 'ar' ? 'تحسين اختيارك' : 'Refine your selection'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-teal/5 rounded-full transition-colors text-teal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 md:space-y-10">
              {/* Sort By */}
              <section>
                <h3 className={`text-xs font-bold text-teal/40 uppercase tracking-[0.2em] mb-4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('sortBy')}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${sortBy === option.value
                          ? 'bg-white border-teal text-teal shadow-sm'
                          : 'bg-white/50 border-teal/5 text-teal/60 hover:border-teal/20'
                        } ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                      <span className="font-bold text-sm">{option.label}</span>
                      {sortBy === option.value && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </section>

              {/* Sizes */}
              <section>
                <h3 className={`text-xs font-bold text-teal/40 uppercase tracking-[0.2em] mb-4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? 'المقاسات' : 'Sizes'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ALL_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-4 py-2 rounded-xl border text-sm font-bold transition-all ${selectedSizes.includes(size)
                          ? 'bg-teal text-white border-teal shadow-md shadow-teal/10'
                          : 'bg-white/50 border-teal/5 text-teal/60 hover:border-teal/20'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>

              {/* Colors */}
              <section>
                <h3 className={`text-xs font-bold text-teal/40 uppercase tracking-[0.2em] mb-4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? 'الألوان' : 'Colors'}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {COMMON_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className="group relative flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedColors.includes(color.name)
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
                      <span className="text-[10px] font-bold text-teal/60">{color.name}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className={`p-6 bg-white border-t border-teal/5 flex gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={clearAll}
                className="flex-1 py-4 text-teal font-bold text-sm hover:underline"
              >
                {locale === 'ar' ? 'مسح الكل' : 'Clear All'}
              </button>
              <button
                onClick={onClose}
                className="flex-[2] py-4 bg-teal text-white rounded-2xl font-bold shadow-lg shadow-teal/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {locale === 'ar' ? 'عرض النتائج' : 'Show Results'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
