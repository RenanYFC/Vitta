import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/mocks/products';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getCartCount: () => number;
  getCartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],

      addToCart: (product, size) => {
        const { items } = get();
        const existing = items.find(
          (item) => item.product.id === product.id && item.size === size,
        );
        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ items: [...items, { product, size, quantity: 1 }] });
        }
      },

      removeFromCart: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.size === size),
          ),
        });
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      toggleWishlist: (productId) => {
        const { wishlist } = get();
        if (wishlist.includes(productId)) {
          set({ wishlist: wishlist.filter((id) => id !== productId) });
        } else {
          set({ wishlist: [...wishlist, productId] });
        }
      },

      isInWishlist: (productId) => get().wishlist.includes(productId),

      getCartCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getCartTotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),
    }),
    {
      name: 'vitta-cart-storage',
    },
  ),
);