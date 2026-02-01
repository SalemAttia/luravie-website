import React from 'react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Product } from '@/data';
import { useTranslations, useLocale } from 'next-intl';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (e?: React.MouseEvent) => void;
  onAddToCart: (p: Product, size?: string, color?: { name: string; hex: string }) => void;
  onBuyNow: (p: Product, size?: string, color?: { name: string; hex: string }) => void;
  onClick: (p: Product) => void;
  onOpenQuickSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
  onClick,
  onOpenQuickSelect
}) => {
  const t = useTranslations('common');
  const locale = useLocale();
  const [isAdded, setIsAdded] = React.useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenQuickSelect(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-blush mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
        <div
          className="cursor-pointer h-full w-full"
          onClick={() => onClick(product)}
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
        </div>

        <button
          onClick={(e) => {
            onToggleFavorite(e);
          }}
          className={`absolute top-6 ${locale === 'ar' ? 'left-6' : 'right-6'} p-3 backdrop-blur-md rounded-full transition-all hover:scale-110 active:scale-90 cursor-pointer shadow-lg ${isFavorite
            ? 'bg-coral text-white border-coral'
            : 'bg-white/80 text-teal border border-white opacity-0 group-hover:opacity-100'
            }`}
        >
          <Heart size={20} className={isFavorite ? 'fill-white' : ''} />
        </button>

        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 space-y-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickSelect(product);
            }}
            className="w-full py-4 bg-coral text-white rounded-[1.5rem] font-bold text-sm flex items-center justify-center gap-3 shadow-2xl shadow-coral/30 cursor-pointer hover:scale-[1.05] active:scale-[0.95] transition-all"
          >
            {locale === 'ar' ? 'اطلبي الآن' : 'Order Now'}
          </button>
          <button
            onClick={handleQuickAdd}
            className={`w-full py-4 rounded-[1.5rem] font-bold text-sm flex items-center justify-center gap-3 border backdrop-blur-md transition-all cursor-pointer ${isAdded
              ? 'bg-teal text-white border-teal shadow-xl shadow-teal/20'
              : 'bg-white/90 text-teal border-white shadow-xl hover:bg-teal hover:text-white hover:border-teal'
              }`}
          >
            {isAdded ? (
              <>
                <Check size={16} />
                {locale === 'ar' ? 'تمت الإضافة' : 'Added'}
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                {locale === 'ar' ? 'أضف للحقيبة' : 'Add to Bag'}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2 px-2 cursor-pointer" onClick={() => onClick(product)}>
        <div className={`flex justify-between items-start gap-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
          <h3 className={`font-bold text-teal text-lg tracking-tight leading-tight ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{product.name}</h3>
          <span className="font-black text-coral whitespace-nowrap">{product.price} <span className="text-[10px] font-bold">{locale === 'ar' ? 'ج.م' : 'EGP'}</span></span>
        </div>
        <div className={`flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
          <p className="text-xs font-bold text-teal/40 uppercase tracking-widest">{t(`categories.${product.category.toLowerCase()}`)}</p>
          <div className="flex gap-1">
            {product.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-teal/5"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
