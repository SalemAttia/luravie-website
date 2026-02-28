import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

type UnitSystem = 'US' | 'UK' | 'EU';

interface BraSizeRow {
  us: string;
  uk: string;
  eu: string;
  underbust: string;
  bust: string;
}

interface PantsSizeRow {
  size: string;
  us: string;
  uk: string;
  eu: string;
  waist: string;
  hips: string;
}

interface LingerieSizeRow {
  size: string;
  us: string;
  uk: string;
  eu: string;
  bust: string;
  waist: string;
  hips: string;
}

interface SocksSizeRow {
  size: string;
  us: string;
  uk: string;
  eu: string;
  footLength: string;
}

const BRA_SIZE_CHART: BraSizeRow[] = [
  { us: '32A', uk: '32A', eu: '70A', underbust: '63-67 cm', bust: '77-79 cm' },
  { us: '32B', uk: '32B', eu: '70B', underbust: '63-67 cm', bust: '79-81 cm' },
  { us: '32C', uk: '32C', eu: '70C', underbust: '63-67 cm', bust: '81-83 cm' },
  { us: '34A', uk: '34A', eu: '75A', underbust: '68-72 cm', bust: '82-84 cm' },
  { us: '34B', uk: '34B', eu: '75B', underbust: '68-72 cm', bust: '84-86 cm' },
  { us: '34C', uk: '34C', eu: '75C', underbust: '68-72 cm', bust: '86-88 cm' },
  { us: '36B', uk: '36B', eu: '80B', underbust: '73-77 cm', bust: '89-91 cm' },
  { us: '36C', uk: '36C', eu: '80C', underbust: '73-77 cm', bust: '91-93 cm' },
  { us: '38C', uk: '38C', eu: '85C', underbust: '78-82 cm', bust: '96-98 cm' },
];

const PANTS_SIZE_CHART: PantsSizeRow[] = [
  { size: 'XS', us: '0-2',  uk: '4-6',   eu: '32-34', waist: '60-64 cm', hips: '86-90 cm' },
  { size: 'S',  us: '4-6',  uk: '8-10',  eu: '36-38', waist: '65-69 cm', hips: '91-95 cm' },
  { size: 'M',  us: '8-10', uk: '12-14', eu: '40-42', waist: '70-74 cm', hips: '96-100 cm' },
  { size: 'L',  us: '12-14', uk: '16-18', eu: '44-46', waist: '75-79 cm', hips: '101-105 cm' },
  { size: 'XL', us: '16-18', uk: '20-22', eu: '48-50', waist: '80-84 cm', hips: '106-110 cm' },
];

const LINGERIE_SIZE_CHART: LingerieSizeRow[] = [
  { size: 'S',  us: '4-6',  uk: '8-10',  eu: '36-38', bust: '83-87 cm', waist: '65-69 cm', hips: '91-95 cm' },
  { size: 'M',  us: '8-10', uk: '12-14', eu: '40-42', bust: '88-92 cm', waist: '70-74 cm', hips: '96-100 cm' },
  { size: 'L',  us: '12-14', uk: '16-18', eu: '44-46', bust: '93-97 cm', waist: '75-79 cm', hips: '101-105 cm' },
];

const SOCKS_SIZE_CHART: SocksSizeRow[] = [
  { size: 'S',        us: '5-7',   uk: '3-5',   eu: '35-38', footLength: '22-24 cm' },
  { size: 'M',        us: '7-9',   uk: '5-7',   eu: '38-41', footLength: '24-26 cm' },
  { size: 'L',        us: '9-11',  uk: '7-9',   eu: '41-44', footLength: '26-28 cm' },
  { size: 'One Size', us: '5-11',  uk: '3-9',   eu: '35-44', footLength: '22-28 cm' },
];

const UNIT_SYSTEMS: UnitSystem[] = ['US', 'UK', 'EU'];

export const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose, category }) => {
  const t = useTranslations('sizeGuide');
  const [activeUnit, setActiveUnit] = useState<UnitSystem>('US');

  const renderBraChart = () => (
    <table className="w-full">
      <thead>
        <tr className="border-b border-teal/10">
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('size')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('underbust')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('bust')}</th>
        </tr>
      </thead>
      <tbody>
        {BRA_SIZE_CHART.map((row, idx) => {
          const displaySize = activeUnit === 'EU' ? row.eu : activeUnit === 'UK' ? row.uk : row.us;
          return (
            <tr key={idx} className="border-b border-teal/5 hover:bg-teal/5 transition-colors group">
              <td className="py-2.5 md:py-5">
                <span className="inline-flex items-center justify-center min-w-8 h-8 md:min-w-10 md:h-10 px-2 bg-blush text-teal rounded-lg md:rounded-xl font-bold text-xs md:text-base group-hover:bg-teal group-hover:text-white transition-colors">
                  {displaySize}
                </span>
              </td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{row.underbust}</td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{row.bust}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderPantsChart = () => (
    <table className="w-full">
      <thead>
        <tr className="border-b border-teal/10">
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('size')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('intlSize')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('waist')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('hips')}</th>
        </tr>
      </thead>
      <tbody>
        {PANTS_SIZE_CHART.map((row, idx) => {
          const intlSize = activeUnit === 'EU' ? row.eu : activeUnit === 'UK' ? row.uk : row.us;
          return (
            <tr key={idx} className="border-b border-teal/5 hover:bg-teal/5 transition-colors group">
              <td className="py-2.5 md:py-5">
                <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-blush text-teal rounded-lg md:rounded-xl font-bold text-xs md:text-base group-hover:bg-teal group-hover:text-white transition-colors">
                  {row.size}
                </span>
              </td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{intlSize}</td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{row.waist}</td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{row.hips}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderLingerieChart = () => (
    <table className="w-full">
      <thead>
        <tr className="border-b border-teal/10">
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('size')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('intlSize')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('bust')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('waist')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('hips')}</th>
        </tr>
      </thead>
      <tbody>
        {LINGERIE_SIZE_CHART.map((row, idx) => {
          const intlSize = activeUnit === 'EU' ? row.eu : activeUnit === 'UK' ? row.uk : row.us;
          return (
            <tr key={idx} className="border-b border-teal/5 hover:bg-teal/5 transition-colors group">
              <td className="py-2.5 md:py-5">
                <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-blush text-teal rounded-lg md:rounded-xl font-bold text-xs md:text-base group-hover:bg-teal group-hover:text-white transition-colors">
                  {row.size}
                </span>
              </td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{intlSize}</td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{row.bust}</td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{row.waist}</td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{row.hips}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderSocksChart = () => (
    <table className="w-full">
      <thead>
        <tr className="border-b border-teal/10">
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('size')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('shoeSize')}</th>
          <th className="py-2 md:py-4 text-left text-teal font-bold text-[10px] md:text-sm tracking-widest uppercase">{t('footLength')}</th>
        </tr>
      </thead>
      <tbody>
        {SOCKS_SIZE_CHART.map((row, idx) => {
          const shoeSize = activeUnit === 'EU' ? row.eu : activeUnit === 'UK' ? row.uk : row.us;
          return (
            <tr key={idx} className="border-b border-teal/5 hover:bg-teal/5 transition-colors group">
              <td className="py-2.5 md:py-5">
                <span className="inline-flex items-center justify-center min-w-8 h-8 md:min-w-10 md:h-10 px-2 bg-blush text-teal rounded-lg md:rounded-xl font-bold text-xs md:text-base group-hover:bg-teal group-hover:text-white transition-colors whitespace-nowrap">
                  {row.size}
                </span>
              </td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{shoeSize}</td>
              <td className="py-2.5 md:py-5 text-gray-600 font-medium text-xs md:text-base">{row.footLength}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderChart = () => {
    switch (category) {
      case 'Bra': return renderBraChart();
      case 'Pants': return renderPantsChart();
      case 'Lingerie': return renderLingerieChart();
      case 'Socks': return renderSocksChart();
      default: return renderPantsChart();
    }
  };

  const getMeasureTipKey = () => {
    switch (category) {
      case 'Bra': return 'measureTipBra';
      case 'Pants': return 'measureTipPants';
      case 'Lingerie': return 'measureTipLingerie';
      case 'Socks': return 'measureTipSocks';
      default: return 'measureTipPants';
    }
  };

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
              {/* Unit System Toggle */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <span className="text-[10px] md:text-xs font-bold text-teal/50 uppercase tracking-widest">
                  {t('sizingSystem')}
                </span>
                <div className="flex bg-blush rounded-lg md:rounded-xl p-0.5 md:p-1 border border-teal/10">
                  {UNIT_SYSTEMS.map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setActiveUnit(unit)}
                      className={`px-3 py-1 md:px-4 md:py-1.5 rounded-md md:rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${
                        activeUnit === unit
                          ? 'bg-teal text-white shadow-sm'
                          : 'text-teal/50 hover:text-teal'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                {renderChart()}
              </div>

              {/* Category-specific tips */}
              <div className="mt-4 md:mt-8 p-3 md:p-6 bg-rose/30 rounded-xl md:rounded-3xl flex gap-3 md:gap-4 items-start border border-rose">
                <div className="p-1.5 md:p-2 bg-white rounded-lg md:rounded-xl text-teal shrink-0">
                  <Info className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-gray-900 text-xs md:text-sm">{t('howToMeasure')}</p>
                  <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
                    {t(getMeasureTipKey())}
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
