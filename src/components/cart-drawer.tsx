import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Product } from '@/data';
import { useTranslations, useLocale } from 'next-intl';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: { name: string; hex: string };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size?: string, colorName?: string, delta?: number) => void;
  onRemove: (id: string, size?: string, colorName?: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
  onCheckout
}) => {
  const t = useTranslations('common');
  const locale = useLocale();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed ${locale === 'ar' ? 'left-0' : 'right-0'} top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col`}
          >
            <div className={`p-6 border-b border-gray-100 flex items-center justify-between ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-xl font-medium text-teal flex items-center gap-2">
                <ShoppingBag size={20} />
                {t('cart')}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className={`flex-1 overflow-y-auto ${cartItems.length === 0 ? 'flex' : 'p-6 space-y-6'}`}>
              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-8 space-y-6">
                  <div className="w-24 h-24 bg-blush rounded-full flex items-center justify-center text-teal shadow-inner">
                    <ShoppingBag size={40} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-teal mb-2">{t('checkout.empty')}</p>
                    <p className="text-teal/40 text-sm leading-relaxed px-4">
                      {t('checkout.emptySubtitle')}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-10 py-4 bg-teal text-white rounded-2xl font-bold shadow-lg shadow-teal/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {t('checkout.startShopping')}
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize || 'nosize'}-${item.selectedColor?.name || 'nocolor'}`} className={`flex gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-blush flex-shrink-0 shadow-sm border border-teal/5">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`flex-1 flex flex-col justify-between py-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div>
                        <div className={`flex justify-between items-start ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                          <h3 className="font-bold text-teal line-clamp-1">{item.name}</h3>
                          <button
                            onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor?.name)}
                            className="text-teal/20 hover:text-coral transition-colors cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className={`flex items-center gap-2 mt-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                          {item.selectedSize && (
                            <span className="text-[10px] bg-teal/5 text-teal px-2 py-1 rounded-lg font-bold uppercase tracking-widest border border-teal/5">
                              {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <div className={`flex items-center gap-1.5 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                              <div
                                className="w-3 h-3 rounded-full border border-black/5"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <span className="text-[10px] font-bold text-teal/40 uppercase tracking-tighter">{item.selectedColor.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`flex items-center justify-between mt-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center bg-blush/50 rounded-xl px-2 py-1 gap-3 border border-teal/5 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor?.name, -1)}
                            disabled={item.quantity <= 1}
                            className="p-1 text-teal/40 hover:text-teal disabled:opacity-20 cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold text-teal w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor?.name, 1)}
                            className="p-1 text-teal/40 hover:text-teal cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-coral">{item.price * item.quantity} {locale === 'ar' ? 'ج.م' : 'EGP'}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-8 bg-white border-t border-teal/5 space-y-6">
                <div className={`flex justify-between items-center ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-teal/40 font-bold uppercase tracking-widest text-xs">{t('subtotal')}</span>
                  <span className="text-2xl font-bold text-teal">{subtotal} {locale === 'ar' ? 'ج.م' : 'EGP'}</span>
                </div>
                <p className={`text-[10px] text-teal/30 leading-relaxed font-bold uppercase tracking-widest ${locale === 'ar' ? 'text-right' : ''}`}>
                  {t('taxesNotice')}
                </p>
                <div className="pt-2">
                  <button
                    onClick={onCheckout}
                    className="w-full py-5 bg-coral text-white rounded-[1.5rem] font-bold text-lg shadow-xl shadow-coral/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-3"
                  >
                    {t('checkout')}
                    <ArrowRight size={20} className={locale === 'ar' ? 'rotate-180' : ''} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
