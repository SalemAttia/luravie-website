"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { PRODUCTS, Product } from '@/data';

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

interface AppContextType {
  cartItems: CartItem[];
  favorites: string[];
  addToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  buyNow: (product: Product, size: string, color: { name: string; hex: string }) => void;
  updateQuantity: (id: string, size: string, colorName: string, delta: number) => void;
  removeFromCart: (id: string, size: string, colorName: string) => void;
  toggleFavorite: (productId: string, e?: React.MouseEvent) => void;
  clearCart: () => void;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const toggleFavorite = (productId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setFavorites(prev => {
      const isFav = prev.includes(productId);
      if (isFav) {
        toast.info('Removed from favorites');
        return prev.filter(id => id !== productId);
      } else {
        toast.success('Added to favorites', { icon: '❤️' });
        return [...prev, productId];
      }
    });
  };

  const addToCart = (product: Product, size: string, color: { name: string; hex: string }) => {
    setCartItems(prev => {
      const existing = prev.find(item =>
        item.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor.name === color.name
      );
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.selectedSize === size && item.selectedColor.name === color.name)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });

    toast.success('Added to your bag', {
      description: `${product.name} in ${color.name}, size ${size} is waiting for you.`,
      icon: '✨',
      position: 'bottom-right',
    });
  };

  const buyNow = (product: Product, size: string, color: { name: string; hex: string }) => {
    addToCart(product, size, color);
  };

  const updateQuantity = (id: string, size: string, colorName: string, delta: number) => {
    setCartItems(prev => prev.map(item =>
      (item.id === id && item.selectedSize === size && item.selectedColor.name === colorName)
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string, size: string, colorName: string) => {
    setCartItems(prev => prev.filter(item =>
      !(item.id === id && item.selectedSize === size && item.selectedColor.name === colorName)
    ));
  };

  const clearCart = () => setCartItems([]);

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
