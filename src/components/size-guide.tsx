import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, Info } from 'lucide-react';

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
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-teal p-8 text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Ruler size={28} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Size Guide</h2>
              </div>
              <p className="opacity-90 text-sm">Find your perfect fit for {category} collection.</p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-teal/10">
                      <th className="py-4 text-left text-teal font-bold text-sm tracking-widest uppercase">Size</th>
                      {Object.keys(chart[0]).filter(k => k !== 'size').map(key => (
                        <th key={key} className="py-4 text-left text-teal font-bold text-sm tracking-widest uppercase">
                          {key.replace('_', ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.map((row, idx) => (
                      <tr key={idx} className="border-b border-teal/5 hover:bg-teal/5 transition-colors group">
                        <td className="py-6">
                          <span className="w-10 h-10 flex items-center justify-center bg-blush text-teal rounded-xl font-bold group-hover:bg-teal group-hover:text-white transition-colors">
                            {row.size}
                          </span>
                        </td>
                        {Object.entries(row).filter(([k]) => k !== 'size').map(([key, value]) => (
                          <td key={key} className="py-6 text-gray-600 font-medium">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tips Section */}
              <div className="mt-8 p-6 bg-rose/30 rounded-3xl flex gap-4 items-start border border-rose">
                <div className="p-2 bg-white rounded-xl text-teal">
                  <Info size={20} />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-gray-900 text-sm">How to measure?</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Use a fabric tape measure. For the best fit, measure while wearing minimal clothing. If you fall between two sizes, we recommend ordering the larger size for a more comfortable experience.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-teal text-white rounded-2xl font-bold shadow-lg shadow-teal/20 hover:scale-105 transition-all"
                >
                  Got it, Thanks
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
