"use client";

import React from 'react';
import { Heart, ShoppingBag, Check, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Product } from '@/data';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

interface ProductCardProps {
  product: Product;
  href: string;
  isFavorite: boolean;
  onToggleFavorite: (e?: React.MouseEvent) => void;
  onAddToCart: (p: Product, size?: string, color?: { name: string; hex: string }) => void;
  onBuyNow: (p: Product, size?: string, color?: { name: string; hex: string }) => void;
  onOpenQuickSelect: (product: Product) => void;
  onNotifyMe?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  href,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
  onOpenQuickSelect,
  onNotifyMe
}) => {
  const t = useTranslations('common');
  const tProduct = useTranslations('product');
  const locale = useLocale();
  const [isAdded, setIsAdded] = React.useState(false);
  const productName = locale === 'ar' && product.nameAr ? product.nameAr : product.name;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
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
      <div className="relative aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden bg-blush mb-3 md:mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
        <Link
          href={href}
          className="cursor-pointer h-full w-full block"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${product.outOfStock ? 'brightness-75' : ''}`}
          />
        </Link>

        {/* Sold Out overlay */}
        {product.outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-black/60 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full backdrop-blur-sm">
              {tProduct('soldOut')}
            </span>
          </div>
        )}

        {!product.outOfStock && (
          <button
            onClick={(e) => {
              onToggleFavorite(e);
            }}
            className={`absolute top-2 md:top-6 ${locale === 'ar' ? 'left-2 md:left-6' : 'right-2 md:right-6'} p-1.5 md:p-3 backdrop-blur-md rounded-full transition-all hover:scale-110 active:scale-90 cursor-pointer shadow-lg ${isFavorite
              ? 'bg-coral text-white border-coral'
              : 'bg-white/80 text-teal border border-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100'
              }`}
          >
            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        )}

        {product.outOfStock ? (
          <div className="absolute bottom-2 left-2 right-2 md:bottom-6 md:left-6 md:right-6 translate-y-0 opacity-100 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNotifyMe?.(product);
              }}
              className="w-full py-2 md:py-4 bg-coral text-white rounded-lg md:rounded-[1.5rem] font-bold text-[11px] md:text-sm flex items-center justify-center gap-1.5 md:gap-3 shadow-2xl shadow-coral/30 cursor-pointer hover:scale-[1.05] active:scale-[0.95] transition-all border border-white/60 backdrop-blur-md"
            >
              <Bell className="w-3 h-3 md:w-4 md:h-4" />
              {tProduct('notifyMe.button')}
            </button>
          </div>
        ) : (
          <div className="absolute bottom-2 left-2 right-2 md:bottom-6 md:left-6 md:right-6 translate-y-0 opacity-100 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 space-y-1.5 md:space-y-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenQuickSelect(product);
              }}
              className="w-full py-2 md:py-4 bg-coral text-white rounded-lg md:rounded-[1.5rem] font-bold text-[11px] md:text-sm flex items-center justify-center gap-1.5 md:gap-3 shadow-2xl shadow-coral/30 cursor-pointer hover:scale-[1.05] active:scale-[0.95] transition-all"
            >
              {t('orderNow')}
            </button>
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2 md:py-4 rounded-lg md:rounded-[1.5rem] font-bold text-[11px] md:text-sm flex items-center justify-center gap-1.5 md:gap-3 border backdrop-blur-md transition-all cursor-pointer ${isAdded
                ? 'bg-teal text-white border-teal shadow-xl shadow-teal/20'
                : 'bg-white/90 text-teal border-white shadow-xl hover:bg-teal hover:text-white hover:border-teal'
                }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3 h-3 md:w-4 md:h-4" />
                  {t('added')}
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
                  {t('addToBag')}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <Link href={href} className="block space-y-1 md:space-y-2 px-1 md:px-2 cursor-pointer">
        <div className={`flex justify-between items-start gap-1 md:gap-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
          <h3 className={`font-bold text-teal text-xs md:text-lg tracking-tight leading-tight ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{productName}</h3>
          <span className="font-black text-coral whitespace-nowrap text-xs md:text-base">{product.price} <span className="text-[8px] md:text-[10px] font-bold">{t('currency')}</span></span>
        </div>
        <div className={`flex items-center gap-1.5 md:gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
          <p className="text-[9px] md:text-xs font-bold text-teal/40 uppercase tracking-widest">{t(`categories.${product.category.toLowerCase()}`)}</p>
          <div className="flex gap-1">
            {product.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-teal/5"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
