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
  onAddToCart: (product: any, size: string, color: any) => void;
  onBuyNow?: (product: any, size: string, color: any) => void;
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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);

  React.useEffect(() => {
    if (product) {
      setSelectedSize(null);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (selectedSize && selectedColor) {
      onAddToCart(product, selectedSize, selectedColor);
      onClose();
    }
  };

  const handleBuyNow = () => {
    if (selectedSize && selectedColor && onBuyNow) {
      onBuyNow(product, selectedSize, selectedColor);
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
            className={`bg-blush w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-teal/10 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            <button
              onClick={onClose}
              className={`absolute top-6 ${locale === 'ar' ? 'left-6' : 'right-6'} p-2 bg-white rounded-full hover:bg-coral hover:text-white transition-all z-20 shadow-sm cursor-pointer`}
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="flex gap-6 mb-8">
                <div className="w-24 h-32 rounded-2xl overflow-hidden bg-white flex-shrink-0 shadow-sm border border-teal/5">
                  <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-teal mb-1">{product.name}</h3>
                  <p className="text-coral font-bold text-lg">{product.price} {locale === 'ar' ? 'ج.م' : 'EGP'}</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Color Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-teal/40 mb-4 block">
                    {t('selectColor')}: <span className="text-teal">{selectedColor?.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative p-1 rounded-full border-2 transition-all cursor-pointer ${selectedColor?.name === color.name ? 'border-coral' : 'border-transparent'
                          }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-black/5"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-teal/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-teal/40 block">
                      {t('selectSize')}
                    </label>
                    <button className="text-[10px] font-bold text-coral flex items-center gap-1 hover:underline cursor-pointer">
                      <Info size={12} /> {locale === 'ar' ? 'دليل المقاسات' : 'SIZE GUIDE'}
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-xl text-sm font-bold transition-all border-2 cursor-pointer ${selectedSize === size
                          ? 'border-coral bg-coral/5 text-coral shadow-sm shadow-coral/10'
                          : 'border-white bg-white text-teal/60 hover:border-coral/20'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={handleAdd}
                  disabled={!selectedSize}
                  className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer ${selectedSize
                    ? 'bg-coral text-white shadow-coral/20 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-teal/5 text-teal/20 cursor-not-allowed shadow-none'
                    }`}
                >
                  <ShoppingBag size={20} />
                  {selectedSize
                    ? (locale === 'ar' ? `أضف مقاس ${selectedSize} للحقيبة` : `Add Size ${selectedSize} to Bag`)
                    : (locale === 'ar' ? 'اختر المقاس' : 'Select a Size')}
                </button>
                {onBuyNow && (
                  <button
                    onClick={handleBuyNow}
                    disabled={!selectedSize}
                    className={`w-full mt-4 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer ${selectedSize
                      ? 'bg-teal text-white shadow-teal/20 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-teal/5 text-teal/20 cursor-not-allowed shadow-none'
                      }`}
                  >
                    {locale === 'ar' ? 'اطلب الآن — شحن مجاني' : 'Order Now — Free Shipping'}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-full mt-4 py-2 text-sm font-bold text-teal/40 hover:text-teal transition-colors cursor-pointer"
                >
                  {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
