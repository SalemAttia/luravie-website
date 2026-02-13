"use client";

import React, { useState } from 'react';
import { ChevronLeft, ShoppingBag, Heart, Shield, RefreshCw, Package, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { SizeGuide } from '@/components/size-guide';
import { Product } from '@/data';
import { useTranslations, useLocale } from 'next-intl';

interface ProductDetailProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (e?: React.MouseEvent) => void;
  onBack: () => void;
  onAddToCart: (p: Product, size?: string, color?: { name: string; hex: string }) => void;
  onBuyNow: (p: Product, size?: string, color?: { name: string; hex: string }) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onBack,
  onAddToCart,
  onBuyNow
}) => {
  const t_common = useTranslations('common');
  const t_product = useTranslations('product');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState(product.sizes.length > 0 ? product.sizes[0] : undefined);
  const [selectedColor, setSelectedColor] = useState(product.colors.length > 0 ? product.colors[0] : undefined);
  const [mainImage, setMainImage] = useState(product.image);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedStatus, setAddedStatus] = useState(false);

  const tabKeys = ['description', 'materials', 'shipping'] as const;
  const tabs = tabKeys.map(key => ({ key, label: t_product(`tabs.${key}`) }));

  const handleAddAction = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedStatus(true);
    setTimeout(() => setAddedStatus(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <SizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
      <button
        onClick={onBack}
        className={`flex items-center gap-2 text-muted-foreground hover:text-teal transition-colors mb-4 md:mb-8 cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
      >
        {locale === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        {t_product('backToShop')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-16">
        <div className="space-y-3 md:space-y-4">
          <motion.div
            key={mainImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square md:aspect-[4/5] rounded-2xl md:rounded-[3rem] overflow-hidden bg-blush shadow-xl border border-teal/5"
          >
            <ImageWithFallback
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-1 -mx-1 px-1 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square w-16 md:w-auto shrink-0 rounded-xl md:rounded-2xl overflow-hidden bg-white border cursor-pointer hover:border-coral transition-all ${mainImage === img ? 'border-coral ring-2 ring-coral/20' : 'border-teal/10'}`}
                >
                  <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className={`mb-4 md:mb-8 ${locale === 'ar' ? 'text-right' : ''}`}>
            <p className="text-coral font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 md:mb-3">
              {t_common(`categories.${product.category.toLowerCase()}`)}
            </p>
            <h1 className="text-xl md:text-5xl font-bold text-teal mb-1 md:mb-4 leading-tight">{product.name}</h1>
            <p className="text-lg md:text-4xl font-bold text-coral">{product.price} {t_common('currency')}</p>
          </div>

          {product.colors.length > 0 && (
            <div className="mb-4 md:mb-8">
              <div className={`flex justify-between items-center mb-2 md:mb-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-teal uppercase tracking-widest text-[10px] md:text-xs">{t_product('selectColor')}</span>
                <span className="text-xs md:text-sm font-bold text-teal/60">{selectedColor?.name}</span>
              </div>
              <div className={`flex flex-wrap gap-3 md:gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 md:w-12 md:h-12 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${selectedColor?.name === color.name ? 'border-coral p-0.5 md:p-1' : 'border-white bg-white shadow-sm'
                      }`}
                  >
                    <div
                      className="w-full h-full rounded-full border border-black/5 flex items-center justify-center text-white"
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor?.name === color.name && <Check size={16} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div className="mb-4 md:mb-8">
              <div className={`flex justify-between items-center mb-2 md:mb-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-teal uppercase tracking-widest text-[10px] md:text-xs">{t_product('selectSize')}</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-coral text-xs font-bold uppercase tracking-widest underline cursor-pointer hover:text-teal transition-colors"
                >
                  {t_product('sizeGuide')}
                </button>
              </div>
              <div className={`flex flex-wrap gap-2 md:gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-10 h-10 md:min-w-16 md:h-16 px-3 md:px-4 rounded-lg md:rounded-2xl border-2 font-bold text-xs md:text-base transition-all cursor-pointer ${selectedSize === size
                      ? 'border-coral bg-coral text-white shadow-xl shadow-coral/20'
                      : 'border-white bg-white text-teal/60 hover:border-coral/20'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 md:space-y-4 mb-6 md:mb-12">
            <div className="flex flex-row gap-2 sm:gap-4">
              <button
                onClick={handleAddAction}
                className={`flex-1 py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-xl transition-all cursor-pointer ${addedStatus
                  ? 'bg-teal text-white shadow-teal/20'
                  : 'bg-teal text-rose shadow-teal/20 hover:scale-[1.02] active:scale-[0.98]'
                  } ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                {addedStatus ? (
                  <>
                    <Check size={20} />
                    {t_common('added')}
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    {t_common('addToBag')}
                  </>
                )}
              </button>
              <button
                onClick={(e) => onToggleFavorite(e)}
                className={`p-2.5 md:p-5 rounded-xl md:rounded-2xl transition-all border-2 cursor-pointer ${isFavorite
                  ? 'bg-coral border-coral text-white shadow-xl shadow-coral/20'
                  : 'bg-white border-white text-coral hover:bg-coral/5'
                  }`}
              >
                <Heart className={`w-5 h-5 md:w-6 md:h-6 ${isFavorite ? 'fill-white' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => onBuyNow(product, selectedSize || undefined, selectedColor || undefined)}
              className="w-full py-3 md:py-6 bg-coral text-white rounded-xl md:rounded-2xl font-bold text-xs md:text-xl flex items-center justify-center gap-2 md:gap-3 shadow-2xl shadow-coral/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {t_common('orderNow')} — {t_common('freeShipping')}
            </button>
            <p className={`text-center text-[10px] text-teal/40 uppercase tracking-[0.2em] font-bold ${locale === 'ar' ? 'text-right' : ''}`}>
              {t_product('codNotice')}
            </p>
          </div>

          <div className="border-t border-teal/10 pt-6 md:pt-8">
            <div className={`flex gap-3 md:gap-8 border-b border-teal/10 mb-4 md:mb-6 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-4 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all relative cursor-pointer ${activeTab === tab.key ? 'text-teal' : 'text-teal/30 hover:text-teal/60'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[150px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`text-teal/70 leading-relaxed font-medium ${locale === 'ar' ? 'text-right' : ''}`}
                >
                  {activeTab === 'description' && (
                    <div className="space-y-4">
                      <div
                        className="text-base md:text-lg text-teal/80"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                      <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 ${locale === 'ar' ? 'text-right' : ''}`}>
                        {product.features.map((f, idx) => (
                          <li key={idx} className={`flex items-center gap-2 md:gap-3 text-xs md:text-sm bg-white/40 p-2.5 md:p-3 rounded-xl border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-2 h-2 rounded-full bg-coral shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'materials' && (
                    <div className="space-y-6">
                      <div className="bg-white/40 p-4 rounded-2xl border border-teal/5">
                        <p className={`text-xs uppercase tracking-widest text-teal/40 mb-2 ${locale === 'ar' ? 'text-right' : ''}`}>
                          {t_product('composition')}
                        </p>
                        <p className="font-bold text-teal">{product.materials}</p>
                      </div>
                      <p className="text-sm">
                        {t_product('careInstructions')}
                      </p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={`flex gap-4 items-center bg-white/40 p-4 rounded-2xl border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                          <Package size={20} className="text-teal" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-teal">{t_product('discreet')}</p>
                          <p className="text-[10px] text-teal/50 uppercase tracking-tighter">{t_product('plainBoxes')}</p>
                        </div>
                      </div>
                      <div className={`flex gap-4 items-center bg-white/40 p-4 rounded-2xl border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                          <RefreshCw size={20} className="text-teal" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-teal">{t_product('inspection')}</p>
                          <p className="text-[10px] text-teal/50 uppercase tracking-tighter">{t_product('payAfterInspection')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
