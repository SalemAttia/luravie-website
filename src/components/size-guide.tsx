import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

const SIZE_CHART = {
  'Bra': [
    { size: 'XS', bust: '78-82 cm', waist: '60-64 cm', description: 'Ideal for very petite frames' },
    { size: 'S', bust: '83-87 cm', waist: '65-69 cm', description: 'Petite to medium frames' },
    { size: 'M', bust: '88-92 cm', waist: '70-74 cm', description: 'Average/Standard build' },
    { size: 'L', bust: '93-97 cm', waist: '75-79 cm', description: 'Curvy or larger frames' },
    { size: 'XL', bust: '98-102 cm', waist: '80-84 cm', description: 'Extra support and space' },
  ],
  'Pants': [
    { size: 'XS', waist: '60-64 cm', hips: '86-90 cm', description: 'Size 32-34' },
    { size: 'S', waist: '65-69 cm', hips: '91-95 cm', description: 'Size 36-38' },
    { size: 'M', waist: '70-74 cm', hips: '96-100 cm', description: 'Size 40-42' },
    { size: 'L', waist: '75-79 cm', hips: '101-105 cm', description: 'Size 44-46' },
    { size: 'XL', waist: '80-84 cm', hips: '106-110 cm', description: 'Size 48+' },
  ],
  'General': [
    { size: 'XS', fit: 'Extra Small', chest: '80-84 cm', length: '60 cm' },
    { size: 'S', fit: 'Small', chest: '88-92 cm', length: '62 cm' },
    { size: 'M', fit: 'Medium', chest: '96-100 cm', length: '64 cm' },
    { size: 'L', fit: 'Large', chest: '104-108 cm', length: '66 cm' },
    { size: 'XL', fit: 'Extra Large', chest: '112-116 cm', length: '68 cm' },
  ]
};

export const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose, category }) => {
  const t = useTranslations('sizeGuide');
  const chart = SIZE_CHART[category as keyof typeof SIZE_CHART] || SIZE_CHART['General'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg md:max-w-2xl max-h-[85vh] bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-teal p-4 md:p-8 text-white relative shrink-0">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 md:top-6 md:right-6 p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-2">
                <div className="p-2 md:p-3 bg-white/20 rounded-xl md:rounded-2xl">
                  <Ruler className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <h2 className="text-xl md:text-3xl font-bold tracking-tight">{t('title')}</h2>
              </div>
              <p className="opacity-90 text-xs md:text-sm">{t('subtitle', { category })}</p>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8 overflow-y-auto">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-teal/10">
                      <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('size')}</th>
                      {Object.keys(chart[0]).filter(k => k !== 'size').map(key => (
                        <th key={key} className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">
                          {key.replace('_', ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.map((row, idx) => (
                      <tr key={idx} className="border-b border-teal/5 hover:bg-teal/5 transition-colors group">
                        <td className="py-2.5 md:py-6">
                          <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-blush text-teal rounded-lg md:rounded-xl font-bold text-xs md:text-base group-hover:bg-teal group-hover:text-white transition-colors">
                            {row.size}
                          </span>
                        </td>
                        {Object.entries(row).filter(([k]) => k !== 'size').map(([key, value]) => (
                          <td key={key} className="py-2.5 md:py-6 text-gray-600 font-medium text-xs md:text-base">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tips Section */}
              <div className="mt-4 md:mt-8 p-3 md:p-6 bg-rose/30 rounded-xl md:rounded-3xl flex gap-3 md:gap-4 items-start border border-rose">
                <div className="p-1.5 md:p-2 bg-white rounded-lg md:rounded-xl text-teal shrink-0">
                  <Info className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-gray-900 text-xs md:text-sm">{t('howToMeasure')}</p>
                  <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
                    {t('measureTip')}
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-8 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 md:px-8 md:py-3 bg-teal text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base shadow-lg shadow-teal/20 hover:scale-105 transition-all"
                >
                  {t('gotIt')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
