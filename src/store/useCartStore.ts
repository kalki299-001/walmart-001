import { create } from 'zustand';
import { CartItem } from './types';

interface CartStore {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  loadCartFromCookies: () => void;
  saveCartToCookies: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      const newCart = existingItem
        ? state.cart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...state.cart, { ...item, quantity: 1 }];
      
      document.cookie = `cart=${JSON.stringify(newCart)}; path=/; max-age=86400`;
      return { cart: newCart };
    });
  },
  
  removeFromCart: (id) => {
    set((state) => {
      const newCart = state.cart.filter(item => item.id !== id);
      document.cookie = `cart=${JSON.stringify(newCart)}; path=/; max-age=86400`;
      return { cart: newCart };
    });
  },
  
  updateQuantity: (id, quantity) => {
    set((state) => {
      const newCart = quantity === 0 
        ? state.cart.filter(item => item.id !== id)
        : state.cart.map(item => 
            item.id === id ? { ...item, quantity } : item
          );
      
      document.cookie = `cart=${JSON.stringify(newCart)}; path=/; max-age=86400`;
      return { cart: newCart };
    });
  },

  loadCartFromCookies: () => {
    try {
      const cart = document.cookie.split('; ').find(row => row.startsWith('cart='));
      if (cart) {
        const cartData = JSON.parse(cart.split('=')[1]);
        set({ cart: cartData });
      }
    } catch (error) {
      console.error('Error loading cart from cookies:', error);
    }
  },

  saveCartToCookies: () => {
    const { cart } = get();
    document.cookie = `cart=${JSON.stringify(cart)}; path=/; max-age=86400`;
  }
}));