import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Info } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useTranslations, useLocale } from 'next-intl';

interface QuickSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    sizes: string[];
    colors: { name: string; hex: string }[];
  } | null;
  onAddToCart: (product: any, size?: string, color?: any) => void;
  onBuyNow?: (product: any, size?: string, color?: any) => void;
}

export const QuickSelectModal: React.FC<QuickSelectModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onBuyNow
}) => {
  const t = useTranslations('product');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [selectedSize, setSelectedSize] = useState<string | null | undefined>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);

  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes.length > 0 ? null : undefined);
      setSelectedColor(product.colors.length > 0 ? product.colors[0] : undefined);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    const sizeValid = product.sizes.length === 0 || selectedSize;
    const colorValid = product.colors.length === 0 || selectedColor;

    if (sizeValid && colorValid) {
      onAddToCart(product, selectedSize || undefined, selectedColor || undefined);
      onClose();
    }
  };

  const handleBuyNow = () => {
    const sizeValid = product.sizes.length === 0 || selectedSize;
    const colorValid = product.colors.length === 0 || selectedColor;

    if (sizeValid && colorValid && onBuyNow) {
      onBuyNow(product, selectedSize || undefined, selectedColor || undefined);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`bg-blush w-full max-w-sm md:max-w-md rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-teal/10 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 md:top-6 ${locale === 'ar' ? 'left-4 md:left-6' : 'right-4 md:right-6'} p-1.5 md:p-2 bg-white rounded-full hover:bg-coral hover:text-white transition-all z-20 shadow-sm cursor-pointer`}
            >
              <X size={20} />
            </button>

            <div className="p-4 md:p-8">
              <div className="flex gap-3 md:gap-6 mb-4 md:mb-8">
                <div className="w-14 h-20 md:w-24 md:h-32 rounded-lg md:rounded-2xl overflow-hidden bg-white flex-shrink-0 shadow-sm border border-teal/5">
                  <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-sm md:text-xl font-bold text-teal mb-0.5 md:mb-1">{product.name}</h3>
                  <p className="text-coral font-bold text-sm md:text-lg">{product.price} {tCommon('currency')}</p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-8">
                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div>
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-teal/40 mb-2 md:mb-4 block">
                      {t('selectColor')}: <span className="text-teal">{selectedColor?.name}</span>
                    </label>
                    <div className="flex flex-wrap gap-2.5 md:gap-4">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative p-0.5 md:p-1 rounded-full border-2 transition-all cursor-pointer ${selectedColor?.name === color.name ? 'border-coral' : 'border-transparent'
                            }`}
                        >
                          <div
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-black/5"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-teal/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2 md:mb-4">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-teal/40 block">
                        {t('selectSize')}
                      </label>
                      <button className="text-[10px] font-bold text-coral flex items-center gap-1 hover:underline cursor-pointer">
                        <Info size={12} /> {t('sizeGuide')}
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 md:gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 md:py-3 rounded-lg md:rounded-xl text-[11px] md:text-sm font-bold transition-all border-2 cursor-pointer ${selectedSize === size
                            ? 'border-coral bg-coral/5 text-coral shadow-sm shadow-coral/10'
                            : 'border-white bg-white text-teal/60 hover:border-coral/20'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 md:mt-10">
                <button
                  onClick={handleAdd}
                  disabled={product.sizes.length > 0 && !selectedSize}
                  className={`w-full py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-xl transition-all cursor-pointer ${(product.sizes.length === 0 || selectedSize)
                    ? 'bg-coral text-white shadow-coral/20 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-teal/5 text-teal/20 cursor-not-allowed shadow-none'
                    }`}
                >
                  <ShoppingBag size={16} className="md:w-5 md:h-5" />
                  {product.sizes.length === 0 || selectedSize
                    ? tCommon('addToBag')
                    : t('selectASize')}
                </button>
                {onBuyNow && (
                  <button
                    onClick={handleBuyNow}
                    disabled={product.sizes.length > 0 && !selectedSize}
                    className={`w-full mt-2 md:mt-4 py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-xl transition-all cursor-pointer ${(product.sizes.length === 0 || selectedSize)
                      ? 'bg-teal text-white shadow-teal/20 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-teal/5 text-teal/20 cursor-not-allowed shadow-none'
                      }`}
                  >
                    {t('orderNowFreeShipping')}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-full mt-1 md:mt-4 py-1.5 md:py-2 text-xs md:text-sm font-bold text-teal/40 hover:text-teal transition-colors cursor-pointer"
                >
                  {tCommon('cancel')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
