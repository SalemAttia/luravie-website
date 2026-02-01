import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Product } from '@/data';

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: string, colorName: string, delta: number) => void;
  onRemove: (id: string, size: string, colorName: string) => void;
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-medium text-teal flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Bag
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blush rounded-full flex items-center justify-center text-teal">
                    <ShoppingBag size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Your bag is empty</p>
                    <p className="text-muted-foreground text-sm">Find something you love to start your journey.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-teal text-white rounded-full hover:bg-teal/90 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-blush flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                          <button
                            onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor.name)}
                            className="text-gray-400 hover:text-destructive transition-colors ml-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-teal/5 text-teal px-2 py-0.5 rounded-full font-medium">
                            {item.selectedSize}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <div 
                              className="w-2.5 h-2.5 rounded-full border border-black/5" 
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span className="text-xs text-muted-foreground">{item.selectedColor.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-100 rounded-full px-2 py-1 gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor.name, -1)}
                            disabled={item.quantity <= 1}
                            className="disabled:opacity-30"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor.name, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-semibold text-teal">{(item.price * item.quantity).toFixed(0)} EGP</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 bg-blush/50 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-lg font-medium">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(0)} EGP</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Taxes and shipping calculated at checkout. Discreet packaging included.
                </p>
                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-coral text-white rounded-2xl font-semibold shadow-lg shadow-coral/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
