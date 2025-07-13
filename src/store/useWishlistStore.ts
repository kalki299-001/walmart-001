import { create } from 'zustand';
import { WishlistItem } from './types';

interface WishlistStore {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  loadWishlistFromCookies: () => void;
  saveWishlistToCookies: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [],

  addToWishlist: (item) => {
    set((state) => {
      const newWishlist = [...state.wishlist, item];
      document.cookie = `wishlist=${JSON.stringify(newWishlist)}; path=/; max-age=86400`;
      return { wishlist: newWishlist };
    });
  },

  removeFromWishlist: (id) => {
    set((state) => {
      const newWishlist = state.wishlist.filter(item => item.id !== id);
      document.cookie = `wishlist=${JSON.stringify(newWishlist)}; path=/; max-age=86400`;
      return { wishlist: newWishlist };
    });
  },

  loadWishlistFromCookies: () => {
    try {
      const wishlist = document.cookie.split('; ').find(row => row.startsWith('wishlist='));
      if (wishlist) {
        const wishlistData = JSON.parse(wishlist.split('=')[1]);
        set({ wishlist: wishlistData });
      }
    } catch (error) {
      console.error('Error loading wishlist from cookies:', error);
    }
  },

  saveWishlistToCookies: () => {
    const { wishlist } = get();
    document.cookie = `wishlist=${JSON.stringify(wishlist)}; path=/; max-age=86400`;
  }
}));