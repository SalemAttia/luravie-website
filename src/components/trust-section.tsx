import React from 'react';
import { Package, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';

export const TrustSection: React.FC = () => {
  const t = useTranslations('common.trust');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const TRUST_ITEMS = [
    {
      icon: <Package className="text-teal" size={24} />,
      title: t('discreetTitle'),
      desc: t('discreetDesc')
    },
    {
      icon: <CreditCard className="text-teal" size={24} />,
      title: t('codTitle'),
      desc: t('codDesc')
    },
    {
      icon: <ShieldCheck className="text-teal" size={24} />,
      title: t('inspectTitle'),
      desc: t('inspectDesc')
    },
    {
      icon: <Truck className="text-teal" size={24} />,
      title: t('fastTitle'),
      desc: t('fastDesc')
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-rose relative overflow-hidden">
      {/* Decorative text bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="text-[10rem] md:text-[20rem] font-bold text-teal whitespace-nowrap">
          {tCommon('brandName')}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[10px] font-bold text-teal/40 uppercase tracking-[0.4em] mb-4 block">{t('commitment')}</span>
          <h2 className="text-2xl md:text-4xl font-bold text-teal mb-6 tracking-tight">{t('title')}</h2>
          <div className="w-16 h-1 bg-coral mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
          {TRUST_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-4 group"
            >
              <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-xl shadow-teal/5 mb-4 md:mb-8 group-hover:scale-110 group-hover:bg-coral group-hover:text-white transition-all duration-500">
                {React.cloneElement(item.icon as React.ReactElement, { size: 32 } as any)}
              </div>
              <h3 className="font-bold text-teal mb-2 md:mb-4 text-sm md:text-xl tracking-tight">{item.title}</h3>
              <p className="text-xs md:text-sm text-teal/60 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
