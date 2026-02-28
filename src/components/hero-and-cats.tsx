import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const CATEGORIES = [
  { name: 'Bra', image: '/products/ribbed-bras.jpg' },
  { name: 'Pants', image: '/products/lace-panties.jpg' },
  { name: 'Lingerie', image: '/products/lingerie-category.jpg' },
  { name: 'Socks', image: '/products/socks.jpg' },
];

export const CategorySection: React.FC = () => {
  const tCommon = useTranslations('common');
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="py-12 md:py-24 bg-blush" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
            <span className="text-teal font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-70">
              {t('collections')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-teal mb-3 tracking-tighter">
              {t('essentialSilhouettes')}
            </h2>
            <p className="text-teal/80 text-base md:text-xl font-light">
              {t('eleganceInEveryLayer')}
            </p>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-3 text-coral font-bold hover:gap-5 transition-all cursor-pointer uppercase tracking-widest text-xs"
          >
            {t('exploreAllItems')}
            <ArrowRight size={20} className={locale === 'ar' ? 'rotate-180' : ''} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Link href={`/shop?category=${cat.name}`} className="block h-full w-full cursor-pointer">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex justify-between items-center text-white">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-1 opacity-80">
                      {t('collection')}
                    </p>
                    <span className="text-lg md:text-2xl font-bold">{tCommon(`categories.${cat.name.toLowerCase()}`)}</span>
                  </div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowRight size={24} className={locale === 'ar' ? 'rotate-180' : ''} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Hero: React.FC = () => {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <div className="relative lg:min-h-[95vh] flex items-center overflow-hidden bg-teal" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">

          <div
            className={`lg:col-span-7 space-y-6 md:space-y-12 animate-[fadeInUp_0.5s_ease-out_both] ${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 text-rose text-xs font-bold uppercase tracking-[0.3em] border border-white/5 backdrop-blur-md">
              <Sparkles size={16} className="text-coral" />
              {t('luravieEssentials')}
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-[9rem] font-bold text-white leading-[0.85] tracking-tighter">
              {t('heroLine1')} <br /><span className="text-rose italic font-serif font-light">{t('heroLine2')}</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/70 leading-relaxed max-w-xl font-light">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-wrap gap-4 md:gap-8 pt-4">
              <Link
                href="/shop"
                className="group px-8 py-4 md:px-12 md:py-6 bg-[#C27070] text-white rounded-2xl md:rounded-[2rem] font-bold text-base md:text-xl shadow-[0_20px_50px_rgba(194,112,112,0.3)] hover:shadow-[0_25px_60px_rgba(194,112,112,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 md:gap-4 cursor-pointer"
              >
                {tCommon('shopNow')}
                <ArrowRight size={24} className={`group-hover:translate-x-2 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 md:px-12 md:py-6 bg-white/5 text-rose rounded-2xl md:rounded-[2rem] font-bold text-base md:text-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer"
              >
                {t('ourValues')}
              </Link>
            </div>

            <div className="flex items-center gap-8 md:gap-16 pt-8 md:pt-12 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-2xl md:text-4xl font-bold text-rose">100%</span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
                  {t('discreet')}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl md:text-4xl font-bold text-rose">{t('premium')}</span>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-5 relative max-w-xs mx-auto lg:max-w-none hidden lg:block animate-[fadeIn_0.6s_ease-out_0.2s_both]"
          >
            {/* Main Visual Frame */}
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-[6px] md:border-[12px] border-white/5 backdrop-blur-3xl">
              <Image
                src="https://images.unsplash.com/photo-1645654731316-a350fdcf3bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc2lsayUyMGZhYnJpYyUyMHRleHR1cmV8ZW58MXx8fHwxNzY5OTU1MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt={tCommon('brandName')}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-teal/40 to-transparent mix-blend-multiply" />
            </div>

            {/* Decorative Floating Element 2 - Minimal Card */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className={`absolute -bottom-6 ${locale === 'ar' ? '-right-10' : '-left-10'} bg-white p-8 rounded-[2.5rem] shadow-2xl border border-teal/5 hidden sm:block`}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-teal rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal/20">
                  <Sparkles size={28} />
                </div>
                <div>
                  <p className="text-lg font-bold text-teal">
                    {t('superiorComfort')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-teal to-transparent" />
      </motion.div>
    </div>
  );
};
