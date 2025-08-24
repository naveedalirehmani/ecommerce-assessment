'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './use-product.store';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      // Actions
      addToCart: (product: Product) => {
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.id === product.id);
          
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...product, quantity: 1 }],
            };
          }
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            return {
              cartItems: state.cartItems.filter((item) => item.id !== productId),
            };
          }
          
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: 'cart-storage', // Key for localStorage
      partialize: (state) => ({ cartItems: state.cartItems }), // Only persist cartItems
    }
  )
);

// Computed selectors
export const useCartItemCount = () => 
  useCartStore((state) => state.cartItems.reduce((total, item) => total + item.quantity, 0));

export const useCartTotalPrice = () => 
  useCartStore((state) => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0));

export const useIsInCart = (productId: string) => 
  useCartStore((state) => state.cartItems.find(item => item.id === productId));

export const useCartItemQuantity = (productId: string) => 
  useCartStore((state) => state.cartItems.find(item => item.id === productId)?.quantity || 0);
