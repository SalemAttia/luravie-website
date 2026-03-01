"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { PRODUCTS, Product } from '@/data';
import { useTranslations } from 'next-intl';
import * as Sentry from "@sentry/nextjs";
import { trackAddToCart, trackRemoveFromCart } from '@/lib/analytics';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: { name: string; hex: string };
  variationId?: number;
}

interface AppContextType {
  cartItems: CartItem[];
  favorites: string[];
  addToCart: (product: Product, size?: string, color?: { name: string; hex: string }, variationId?: number, variantPrice?: number) => void;
  buyNow: (product: Product, size?: string, color?: { name: string; hex: string }, variationId?: number, variantPrice?: number) => void;
  updateQuantity: (id: string, size?: string, colorName?: string, delta?: number) => void;
  removeFromCart: (id: string, size?: string, colorName?: string) => void;
  toggleFavorite: (productId: string, e?: React.MouseEvent) => void;
  clearCart: () => void;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useTranslations('common');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('luravie-cart');
    const savedFavorites = localStorage.getItem('luravie-favorites');

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      } catch (e) {
        Sentry.captureException(e, {
            tags: { component: "AppContext" },
            extra: { action: "parse_cart_localstorage" },
            level: "warning",
        });
        console.error('Failed to parse cart from localStorage', e);
      }
    }

    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch (e) {
        Sentry.captureException(e, {
            tags: { component: "AppContext" },
            extra: { action: "parse_favorites_localstorage" },
            level: "warning",
        });
        console.error('Failed to parse favorites from localStorage', e);
      }
    }

    setIsMounted(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('luravie-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('luravie-favorites', JSON.stringify(favorites));
    }
  }, [favorites, isMounted]);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const toggleFavorite = (productId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setFavorites(prev => {
      const isFav = prev.includes(productId);
      if (isFav) {
        toast.info(t('wishlistRemoved'));
        return prev.filter(id => id !== productId);
      } else {
        toast.success(t('wishlistAdded'), { icon: '❤️' });
        return [...prev, productId];
      }
    });
  };

  const addToCart = (product: Product, size?: string, color?: { name: string; hex: string }, variationId?: number, variantPrice?: number) => {
    const itemPrice = variantPrice ?? product.price;
    setCartItems(prev => {
      const existing = prev.find(item =>
        item.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor?.name === color?.name
      );
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.selectedSize === size && item.selectedColor?.name === color?.name)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, price: itemPrice, quantity: 1, selectedSize: size, selectedColor: color, variationId }];
    });

    trackAddToCart(product, size, color?.name);

    toast.success(t('addedToBag'), {
      description: `${product.name}${color ? ` - ${color.name}` : ''}${size ? `, ${size}` : ''}`,
      icon: '✨',
      position: 'bottom-right',
    });
  };

  const buyNow = (product: Product, size?: string, color?: { name: string; hex: string }, variationId?: number, variantPrice?: number) => {
    addToCart(product, size, color, variationId, variantPrice);
  };

  const updateQuantity = (id: string, size?: string, colorName?: string, delta: number = 1) => {
    setCartItems(prev => prev.map(item =>
      (item.id === id && item.selectedSize === size && item.selectedColor?.name === colorName)
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string, size?: string, colorName?: string) => {
    const item = cartItems.find(i => i.id === id && i.selectedSize === size && i.selectedColor?.name === colorName);
    if (item) {
      trackRemoveFromCart(item);
    }
    setCartItems(prev => prev.filter(item =>
      !(item.id === id && item.selectedSize === size && item.selectedColor?.name === colorName)
    ));
    toast.info(t('removedFromBag'));
  };

  const clearCart = () => setCartItems([]);

  // Evitar problemas de hidratación al no renderizar nada hasta que estemos montados en el cliente
  // o asegurarnos de que el render inicial del cliente sea igual al del servidor
  // En este caso, devolvemos el children pero el estado inicial es []

  return (
    <AppContext.Provider value={{
      cartItems,
      favorites,
      addToCart,
      buyNow,
      updateQuantity,
      removeFromCart,
      toggleFavorite,
      clearCart,
      cartCount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
