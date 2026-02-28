"use client";

import React, { useState } from 'react';
import { ChevronLeft, ShoppingBag, Heart, RefreshCw, Package, Check, ChevronRight, Bell, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { SizeGuide } from '@/components/size-guide';
import { NotifyMeModal } from '@/components/notify-me-modal';
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
  onBuyNow,
}) => {
  const t_common = useTranslations('common');
  const t_product = useTranslations('product');
  const locale = useLocale();
  const productName = locale === 'ar' && product.nameAr ? product.nameAr : product.name;
  const productDescription = locale === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;
  const [selectedSize, setSelectedSize] = useState(product.sizes.length > 0 ? product.sizes[0] : undefined);
  const [selectedColor, setSelectedColor] = useState(product.colors.length > 0 ? product.colors[0] : undefined);
  const [mainImage, setMainImage] = useState(product.image);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isNotifyMeOpen, setIsNotifyMeOpen] = useState(false);
  const [addedStatus, setAddedStatus] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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
      <NotifyMeModal
        isOpen={isNotifyMeOpen}
        onClose={() => setIsNotifyMeOpen(false)}
        product={product}
      />
      <button
        onClick={onBack}
        className={`flex items-center gap-2 text-muted-foreground hover:text-teal transition-colors mb-4 md:mb-8 cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
      >
        {locale === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        {t_product('backToShop')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 items-start">
        <div className="space-y-2 md:space-y-3 lg:sticky lg:top-6">
          <motion.div
            key={mainImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden bg-blush shadow-lg border border-teal/5 cursor-pointer relative group"
            onClick={() => setIsImageModalOpen(true)}
          >
            <ImageWithFallback
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-full p-2">
                <ZoomIn size={20} className="text-teal" />
              </div>
            </div>
          </motion.div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-1.5 md:gap-3 overflow-x-auto pb-1 -mx-1 px-1 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square w-14 md:w-auto shrink-0 rounded-lg md:rounded-xl overflow-hidden bg-white border cursor-pointer hover:border-coral transition-all ${mainImage === img ? 'border-coral ring-2 ring-coral/20' : 'border-teal/10'}`}
                >
                  <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {isImageModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsImageModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-3xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="absolute -top-3 -right-3 md:top-3 md:right-3 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors cursor-pointer"
                >
                  <X size={20} className="text-teal" />
                </button>
                <div className="rounded-2xl md:rounded-3xl overflow-hidden bg-blush shadow-2xl">
                  <ImageWithFallback
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-contain max-h-[85vh]"
                  />
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-3">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setMainImage(img)}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${mainImage === img ? 'border-coral ring-2 ring-coral/20' : 'border-white/40 hover:border-white/70'}`}
                      >
                        <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col">
          <div className={`mb-4 md:mb-8 ${locale === 'ar' ? 'text-right' : ''}`}>
            <div className={`flex items-center gap-2 mb-2 md:mb-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <p className="text-coral font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase">
                {t_common(`categories.${product.category.toLowerCase()}`)}
              </p>
              {product.outOfStock && (
                <span className="bg-teal/10 text-teal/70 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                  {t_product('soldOut')}
                </span>
              )}
            </div>
            <h1 className="text-lg md:text-3xl font-bold text-teal mb-1 md:mb-3 leading-tight">{productName}</h1>
            <p className="text-base md:text-2xl font-bold text-coral">{product.price} {t_common('currency')}</p>
          </div>

          {product.colors.length > 0 && (
            <div className={`mb-4 md:mb-8 ${product.outOfStock ? 'opacity-40' : ''}`}>
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
            <div className={`mb-3 md:mb-6 ${product.outOfStock ? 'opacity-40' : ''}`}>
              <div className={`flex justify-between items-center mb-2 md:mb-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-teal uppercase tracking-widest text-[10px] md:text-xs">{t_product('selectSize')}</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-coral text-xs font-bold uppercase tracking-widest underline transition-colors cursor-pointer hover:text-teal"
                >
                  {t_product('sizeGuide')}
                </button>
              </div>
              <div className={`flex flex-wrap gap-1.5 md:gap-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-8 h-8 md:min-w-12 md:h-12 px-2.5 md:px-3 rounded-lg md:rounded-xl border-2 font-bold text-[10px] md:text-sm transition-all cursor-pointer ${selectedSize === size
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

          <div className="space-y-2 md:space-y-3 mb-4 md:mb-8">
            {product.outOfStock ? (
              <>
                <button
                  onClick={() => setIsNotifyMeOpen(true)}
                  className={`w-full py-2.5 md:py-3.5 bg-coral text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 md:gap-3 shadow-2xl shadow-coral/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <Bell size={18} />
                  {t_product('notifyMe.button')}
                </button>
                <p className={`text-center text-[10px] text-teal/40 uppercase tracking-[0.2em] font-bold ${locale === 'ar' ? 'text-right' : ''}`}>
                  {t_product('notifyMe.hint')}
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-row gap-2 sm:gap-3">
                  <button
                    onClick={handleAddAction}
                    className={`flex-1 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 md:gap-3 shadow-xl transition-all cursor-pointer ${addedStatus
                      ? 'bg-teal text-white shadow-teal/20'
                      : 'bg-teal text-rose shadow-teal/20 hover:scale-[1.02] active:scale-[0.98]'
                      } ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    {addedStatus ? (
                      <>
                        <Check size={18} />
                        {t_common('added')}
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        {t_common('addToBag')}
                      </>
                    )}
                  </button>
                  <button
                    onClick={(e) => onToggleFavorite(e)}
                    className={`p-2 md:p-3.5 rounded-xl md:rounded-2xl transition-all border-2 cursor-pointer ${isFavorite
                      ? 'bg-coral border-coral text-white shadow-xl shadow-coral/20'
                      : 'bg-white border-white text-coral hover:bg-coral/5'
                      }`}
                  >
                    <Heart className={`w-5 h-5 md:w-5 md:h-5 ${isFavorite ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => onBuyNow(product, selectedSize || undefined, selectedColor || undefined)}
                  className="w-full py-2.5 md:py-4 bg-coral text-white rounded-xl md:rounded-2xl font-bold text-xs md:text-base flex items-center justify-center gap-2 md:gap-3 shadow-2xl shadow-coral/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  {t_common('orderNow')}
                </button>
                <p className={`text-center text-[10px] text-teal/40 uppercase tracking-[0.2em] font-bold ${locale === 'ar' ? 'text-right' : ''}`}>
                  {t_product('codNotice')}
                </p>
              </>
            )}
          </div>

          <div className={`border-t border-teal/10 pt-6 md:pt-8 text-teal/70 leading-relaxed font-medium ${locale === 'ar' ? 'text-right' : ''}`}>
            <div className="space-y-4">
              <div
                className="text-sm md:text-base text-teal/80 [&_h2]:text-base [&_h2]:md:text-lg [&_h2]:font-bold [&_h2]:text-teal [&_h2]:mt-4 [&_h2]:mb-1 [&_h3]:text-sm [&_h3]:md:text-base [&_h3]:font-bold [&_h3]:text-teal [&_h3]:mt-3 [&_h3]:mb-1 [&_p]:mb-2 [&_p]:leading-relaxed [&_strong]:font-bold [&_strong]:text-teal [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: productDescription }}
              />
              {product.features.length > 0 && (
                <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 ${locale === 'ar' ? 'text-right' : ''}`}>
                  {product.features.map((f, idx) => (
                    <li key={idx} className={`flex items-center gap-2 md:gap-3 text-xs md:text-sm bg-white/40 p-2.5 md:p-3 rounded-xl border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-2 h-2 rounded-full bg-coral shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-teal/10 mt-5 pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`flex gap-3 items-center bg-white/40 p-3 rounded-xl border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <Package size={18} className="text-teal" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-teal">{t_product('discreet')}</p>
                    <p className="text-[10px] text-teal/50 uppercase tracking-tighter">{t_product('plainBoxes')}</p>
                  </div>
                </div>
                <div className={`flex gap-3 items-center bg-white/40 p-3 rounded-xl border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <RefreshCw size={18} className="text-teal" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-teal">{t_product('inspection')}</p>
                    <p className="text-[10px] text-teal/50 uppercase tracking-tighter">{t_product('payAfterInspection')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
