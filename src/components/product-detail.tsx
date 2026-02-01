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
  onAddToCart: (p: Product, size: string, color: { name: string; hex: string }) => void;
  onBuyNow: (p: Product, size: string, color: { name: string; hex: string }) => void;
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
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedStatus, setAddedStatus] = useState(false);

  const tabs = ['Description', 'Materials & Care', 'Shipping & Privacy'];

  const handleAddAction = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedStatus(true);
    setTimeout(() => setAddedStatus(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <SizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
      <button
        onClick={onBack}
        className={`flex items-center gap-2 text-muted-foreground hover:text-teal transition-colors mb-8 cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
      >
        {locale === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        {t_product('backToShop')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-blush shadow-xl border border-teal/5"
          >
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white border border-teal/10 cursor-pointer hover:border-coral transition-all">
                <ImageWithFallback src={product.image} alt="" className="w-full h-full object-cover opacity-30" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className={`mb-8 ${locale === 'ar' ? 'text-right' : ''}`}>
            <p className="text-coral font-bold text-xs tracking-[0.3em] uppercase mb-3">
              {t_common(`categories.${product.category.toLowerCase()}`)}
            </p>
            <h1 className="text-5xl font-bold text-teal mb-4 leading-tight">{product.name}</h1>
            <p className="text-4xl font-bold text-coral">{product.price} {locale === 'ar' ? 'ج.م' : 'EGP'}</p>
          </div>

          <div className="mb-8">
            <div className={`flex justify-between items-center mb-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <span className="font-bold text-teal uppercase tracking-widest text-xs">{t_product('selectColor')}</span>
              <span className="text-sm font-bold text-teal/60">{selectedColor.name}</span>
            </div>
            <div className={`flex flex-wrap gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${selectedColor.name === color.name ? 'border-coral p-1' : 'border-white bg-white shadow-sm'
                    }`}
                >
                  <div
                    className="w-full h-full rounded-full border border-black/5 flex items-center justify-center text-white"
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor.name === color.name && <Check size={16} />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className={`flex justify-between items-center mb-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <span className="font-bold text-teal uppercase tracking-widest text-xs">{t_product('selectSize')}</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-coral text-xs font-bold uppercase tracking-widest underline cursor-pointer hover:text-teal transition-colors"
              >
                {locale === 'ar' ? 'دليل المقاسات' : 'Size Guide'}
              </button>
            </div>
            <div className={`flex flex-wrap gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-16 h-16 px-4 rounded-2xl border-2 font-bold transition-all cursor-pointer ${selectedSize === size
                      ? 'border-coral bg-coral text-white shadow-xl shadow-coral/20'
                      : 'border-white bg-white text-teal/60 hover:border-coral/20'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="flex gap-4">
              <button
                onClick={handleAddAction}
                className={`flex-1 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer ${addedStatus
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
                className={`p-5 rounded-2xl transition-all border-2 cursor-pointer ${isFavorite
                    ? 'bg-coral border-coral text-white shadow-xl shadow-coral/20'
                    : 'bg-white border-white text-coral hover:bg-coral/5'
                  }`}
              >
                <Heart size={28} className={isFavorite ? 'fill-white' : ''} />
              </button>
            </div>

            <button
              onClick={() => onBuyNow(product, selectedSize, selectedColor)}
              className="w-full py-6 bg-coral text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-2xl shadow-coral/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {t_common('orderNow')} — {t_common('freeShipping')}
            </button>
            <p className={`text-center text-[10px] text-teal/40 uppercase tracking-[0.2em] font-bold ${locale === 'ar' ? 'text-right' : ''}`}>
              {locale === 'ar' ? 'ادفع نقداً عند الاستلام بعد المعاينة' : 'Pay Cash on Delivery after inspection'}
            </p>
          </div>

          <div className="border-t border-teal/10 pt-8">
            <div className={`flex gap-8 border-b border-teal/10 mb-6 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative cursor-pointer ${activeTab === tab ? 'text-teal' : 'text-teal/30 hover:text-teal/60'
                    }`}
                >
                  {locale === 'ar' ? (
                    tab === 'Description' ? 'الوصف' :
                      tab === 'Materials & Care' ? 'المواد والعناية' :
                        'الشحن والخصوصية'
                  ) : tab}
                  {activeTab === tab && (
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
                  {activeTab === 'Description' && (
                    <div className="space-y-4">
                      <p className="text-lg italic font-serif text-teal/80">"{product.description}"</p>
                      <ul className={`grid grid-cols-2 gap-4 ${locale === 'ar' ? 'text-right' : ''}`}>
                        {product.features.map((f, idx) => (
                          <li key={idx} className={`flex items-center gap-3 text-sm bg-white/40 p-3 rounded-xl border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-2 h-2 rounded-full bg-coral shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'Materials & Care' && (
                    <div className="space-y-6">
                      <div className="bg-white/40 p-4 rounded-2xl border border-teal/5">
                        <p className={`text-xs uppercase tracking-widest text-teal/40 mb-2 ${locale === 'ar' ? 'text-right' : ''}`}>
                          {locale === 'ar' ? 'التركيب' : 'Composition'}
                        </p>
                        <p className="font-bold text-teal">{product.materials}</p>
                      </div>
                      <p className="text-sm">
                        {locale === 'ar' ? 'غسيل آلي بماء بارد مع ألوان مماثلة. لا تستخدم المبيض. تجفيف بالمجفف على درجة حرارة منخفضة. لا تكوي.' : 'Machine wash cold with like colors. Do not bleach. Tumble dry low. Do not iron.'}
                      </p>
                    </div>
                  )}
                  {activeTab === 'Shipping & Privacy' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={`flex gap-4 items-center bg-white/40 p-4 rounded-2xl border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                          <Package size={20} className="text-teal" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-teal">{locale === 'ar' ? 'سري' : 'Discreet'}</p>
                          <p className="text-[10px] text-teal/50 uppercase tracking-tighter">{locale === 'ar' ? 'صناديق سادة غير مميزة' : 'Plain unmarked boxes'}</p>
                        </div>
                      </div>
                      <div className={`flex gap-4 items-center bg-white/40 p-4 rounded-2xl border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                          <RefreshCw size={20} className="text-teal" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-teal">{locale === 'ar' ? 'المعاينة' : 'Inspection'}</p>
                          <p className="text-[10px] text-teal/50 uppercase tracking-tighter">{locale === 'ar' ? 'ادفع بعد المعاينة' : 'Pay after inspection'}</p>
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
