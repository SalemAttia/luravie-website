"use client";

import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, Heart, X, ChevronRight, Instagram, Facebook, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import logoImg from "@/assets/9fa13cb21775809b44829beac6f211643ef2d854.png";
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

import { SearchOverlay } from '@/components/search-overlay';

interface NavbarProps {
  cartCount: number;
  favoritesCount: number;
  onCartClick: () => void;
  onFavoritesClick: () => void;
  onNavigate: (page: string) => void;
  onCategoryClick: (category: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  favoritesCount,
  onCartClick,
  onFavoritesClick,
  onNavigate,
  onCategoryClick,
  onSearch,
  searchQuery,
  currentPage
}) => {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = ['Bra', 'Pants', 'Lingerie', 'Socks'];

  const handleMobileNav = (action: () => void) => {
    setIsMenuOpen(false);
    action();
  };

  const navItems = ['Home', ...categories];

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-teal shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24 relative">
            {/* Left side: Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => item === 'Home' ? onNavigate('home') : onCategoryClick(item)}
                  className={`transition-all duration-300 cursor-pointer relative group ${(item === 'Home' && currentPage === 'home') || (currentPage === 'category' && item !== 'Home')
                    ? 'text-rose'
                    : 'text-white/60 hover:text-rose'
                    }`}
                >
                  {item === 'Home' ? t('home') : t(`categories.${item.toLowerCase()}`)}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-coral transition-all duration-300 ${(item === 'Home' && currentPage === 'home') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </button>
              ))}
            </div>

            {/* Mobile: Left Hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-rose hover:scale-110 transition-transform cursor-pointer"
            >
              <Menu size={24} />
            </button>

            {/* Center Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center h-full">
              <button onClick={() => onNavigate('home')} className="flex items-center cursor-pointer">
                <ImageWithFallback
                  src={logoImg}
                  alt="Luravie"
                  className="h-10 md:h-14 w-auto object-contain transition-all duration-500 hover:scale-105"
                  style={{
                    filter: 'brightness(0) invert(1)'
                  }}
                />
              </button>
            </div>

            {/* Right side: Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-rose px-3 py-1.5 rounded-full border border-teal/10 hover:scale-105 transition-all mr-2 cursor-pointer group"
              >
                <Globe size={14} className="text-teal group-hover:rotate-12 transition-transform" />
                <span className="text-teal font-bold text-xs">
                  {locale === 'en' ? 'عربي' : 'English'}
                </span>
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-white/40 hover:text-rose transition-colors cursor-pointer"
              >
                <Search size={20} />
              </button>
              <button
                onClick={onFavoritesClick}
                className="relative p-2 text-white/40 hover:text-rose transition-colors cursor-pointer group"
              >
                <Heart size={20} className={favoritesCount > 0 ? 'fill-coral text-coral' : ''} />
                {favoritesCount > 0 && (
                  <span className="absolute top-0 right-0 bg-coral text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {favoritesCount}
                  </span>
                )}
              </button>
              <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block" />
              <button
                onClick={onCartClick}
                className="relative flex items-center gap-2 pl-2 pr-4 py-2 bg-rose text-teal rounded-full hover:bg-rose/90 transition-all group cursor-pointer shadow-lg shadow-black/10"
              >
                <div className="bg-teal/10 p-1.5 rounded-full">
                  <ShoppingBag size={16} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
                  {t('cart')}
                </span>
                {cartCount > 0 && (
                  <span className="bg-coral text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-teal/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed inset-y-0 ${locale === 'ar' ? 'left-0' : 'right-0'} w-[85%] max-w-sm bg-teal z-[70] md:hidden flex flex-col shadow-2xl`}
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <ImageWithFallback
                  src={logoImg}
                  alt="Luravie"
                  className="h-10 w-auto"
                  style={{
                    filter: 'brightness(0) invert(1)'
                  }}
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-rose hover:scale-110 transition-transform cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
                      {t('home')}
                    </h3>
                    <div className="grid gap-2">
                      <button
                        onClick={() => handleMobileNav(() => onNavigate('home'))}
                        className="flex items-center justify-between w-full p-4 bg-white/5 rounded-2xl text-left font-bold text-rose shadow-sm border border-white/10 hover:bg-white/10 transition-all"
                      >
                        {t('home')}
                        <ChevronRight size={18} className={`text-coral ${locale === 'ar' ? 'rotate-180' : ''}`} />
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleMobileNav(() => onCategoryClick(cat))}
                          className="flex items-center justify-between w-full p-4 bg-white/5 rounded-2xl text-left font-bold text-rose shadow-sm border border-white/10 hover:bg-white/10 transition-all"
                        >
                          {t(`categories.${cat.toLowerCase()}`)}
                          <ChevronRight size={18} className={`text-coral ${locale === 'ar' ? 'rotate-180' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Support</h3>
                    <div className="grid gap-2">
                      <button
                        onClick={() => handleMobileNav(() => onNavigate('about'))}
                        className="flex items-center justify-between w-full p-4 bg-white/5 rounded-2xl text-left font-bold text-rose shadow-sm border border-white/10 hover:bg-white/10 transition-all"
                      >
                        {t('about')}
                        <ChevronRight size={18} className={`text-coral ${locale === 'ar' ? 'rotate-180' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleMobileNav(() => onNavigate('contact'))}
                        className="flex items-center justify-between w-full p-4 bg-white/5 rounded-2xl text-left font-bold text-rose shadow-sm border border-white/10 hover:bg-white/10 transition-all"
                      >
                        {t('contact')}
                        <ChevronRight size={18} className={`text-coral ${locale === 'ar' ? 'rotate-180' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleMobileNav(() => onNavigate('policy'))}
                        className="flex items-center justify-between w-full p-4 bg-white/5 rounded-2xl text-left font-bold text-rose shadow-sm border border-white/10 hover:bg-white/10 transition-all"
                      >
                        {t('policy')}
                        <ChevronRight size={18} className={`text-coral ${locale === 'ar' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-rose/50 uppercase tracking-widest mb-4">Account & Wishlist</h3>
                    <div className="grid gap-2">
                      <button
                        onClick={() => handleMobileNav(onFavoritesClick)}
                        className="flex items-center gap-3 w-full p-4 text-left font-medium text-white/80 hover:text-rose transition-colors"
                      >
                        <Heart size={20} />
                        Your Favorites ({favoritesCount})
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/10 bg-black/10">
                <div className="flex justify-center gap-8 mb-6">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-rose shadow-sm border border-white/10">
                    <Instagram size={20} />
                  </div>
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-rose shadow-sm border border-white/10">
                    <Facebook size={20} />
                  </div>
                </div>
                <p className="text-center text-[10px] text-rose/60 uppercase tracking-[0.2em]">
                  Confidence starts within
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={onSearch}
        initialQuery={searchQuery}
      />
    </>
  );
};
