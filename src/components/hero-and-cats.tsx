import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import logoImg from "@/assets/9fa13cb21775809b44829beac6f211643ef2d854.png";
import { useTranslations, useLocale } from 'next-intl';

const CATEGORIES = [
  { name: 'Bra', image: 'https://images.unsplash.com/photo-1666112514180-193096c14938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc2lsayUyMGJyYSUyMGZsYXRsYXklMjBhZXN0aGV0aWMlMjB0ZWFsJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njk5NTUxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Pants', image: 'https://images.unsplash.com/photo-1673710672680-944563ff9cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3R0b24lMjBicmllZnMlMjBmbGF0bGF5JTIwbWluaW1hbGlzdCUyMGFlc3RoZXRpYyUyMGJlaWdlfGVufDF8fHx8MTc2OTk1NTEyOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Lingerie', image: 'https://images.unsplash.com/photo-1751552147774-c374ae8e9910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc2lsayUyMGxpbmdlcmllJTIwZmxhdGxheSUyMGxhY2UlMjBkZXRhaWwlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2OTk1NTEzMHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Socks', image: 'https://images.unsplash.com/photo-1535137755190-8a0b337717e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY290dG9uJTIwc29ja3MlMjBmbGF0bGF5JTIwYWVzdGhldGljJTIwdGV4dHVyZXxlbnwxfHx8fDE3Njk5NTUxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export const CategorySection: React.FC<{ onNavigate: (c: string) => void }> = ({ onNavigate }) => {
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <section className="py-12 md:py-24 bg-blush">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-teal font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-40">
              {locale === 'ar' ? 'المجموعات' : 'The Collections'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-teal mb-3 tracking-tighter">
              {locale === 'ar' ? 'تصاميم أساسية' : 'Essential Silhouettes'}
            </h2>
            <p className="text-teal/50 text-base md:text-xl font-light">
              {locale === 'ar' ? 'الأناقة في كل طبقة.' : 'Elegance in every layer.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('All')}
            className="group flex items-center gap-3 text-coral font-bold hover:gap-5 transition-all cursor-pointer uppercase tracking-widest text-xs"
          >
            {locale === 'ar' ? 'استكشفي كل المنتجات' : 'Explore all items'}
            <ArrowRight size={20} className={locale === 'ar' ? 'rotate-180' : ''} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              onClick={() => onNavigate(cat.name)}
            >
              <ImageWithFallback
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex justify-between items-center text-white">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1 opacity-80">
                    {locale === 'ar' ? 'مجموعة' : 'Collection'}
                  </p>
                  <span className="text-lg md:text-2xl font-bold">{tCommon(`categories.${cat.name.toLowerCase()}`)}</span>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowRight size={24} className={locale === 'ar' ? 'rotate-180' : ''} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Hero: React.FC<{ onShopNow: () => void; onAboutClick: () => void }> = ({ onShopNow, onAboutClick }) => {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <div className="relative min-h-[95vh] flex items-center overflow-hidden bg-teal">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 md:space-y-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 text-rose text-xs font-bold uppercase tracking-[0.3em] border border-white/5 backdrop-blur-md">
              <Sparkles size={16} className="text-coral" />
              {locale === 'ar' ? 'أساسيات لورافي' : 'Luravie Essentials'}
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-[9rem] font-bold text-white leading-[0.85] tracking-tighter">
              {locale === 'ar' ? (
                <>ثقة <br /><span className="text-rose italic font-serif font-light">داخلك.</span></>
              ) : (
                <>Confident <br /><span className="text-rose italic font-serif font-light">Inside.</span></>
              )}
            </h1>

            <p className="text-lg md:text-2xl text-white/70 leading-relaxed max-w-xl font-light">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-wrap gap-4 md:gap-8 pt-4">
              <button
                onClick={onShopNow}
                className="group px-8 py-4 md:px-12 md:py-6 bg-coral text-white rounded-2xl md:rounded-[2rem] font-bold text-base md:text-xl shadow-[0_20px_50px_rgba(234,123,123,0.3)] hover:shadow-[0_25px_60px_rgba(234,123,123,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 md:gap-4 cursor-pointer"
              >
                {tCommon('shopNow')}
                <ArrowRight size={24} className={`group-hover:translate-x-2 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
              </button>
              <button
                onClick={onAboutClick}
                className="px-8 py-4 md:px-12 md:py-6 bg-white/5 text-rose rounded-2xl md:rounded-[2rem] font-bold text-base md:text-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer"
              >
                {locale === 'ar' ? 'قيمنا' : 'Our Values'}
              </button>
            </div>

            <div className="flex items-center gap-8 md:gap-16 pt-8 md:pt-12 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-2xl md:text-4xl font-bold text-rose">100%</span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
                  {locale === 'ar' ? 'خصوصية' : 'Discreet'}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl md:text-4xl font-bold text-rose">{locale === 'ar' ? 'فخامة' : 'Premium'}</span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
                  {locale === 'ar' ? 'حرير وقطن' : 'Silk & Cotton'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative max-w-xs mx-auto lg:max-w-none"
          >
            {/* Main Visual Frame */}
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-[6px] md:border-[12px] border-white/5 backdrop-blur-3xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1645654731316-a350fdcf3bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc2lsayUyMGZhYnJpYyUyMHRleHR1cmV8ZW58MXx8fHwxNzY5OTU1MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Luravie Premium Fabric"
                className="w-full h-full object-cover"
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
                    {locale === 'ar' ? 'راحة فائقة' : 'Superior Comfort'}
                  </p>
                  <p className="text-xs font-bold text-coral uppercase tracking-widest">
                    {locale === 'ar' ? 'حرير فاخر' : 'Premium Silk'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

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
