// Re-export all stores and types for easy importing
export * from './useCartStore';
export * from './useWishlistStore';
export * from './useFollowingStore';
export * from './useStreamStore';
export * from './types';

// Legacy compatibility - combined store that delegates to individual stores
import { useCartStore } from './useCartStore';
import { useWishlistStore } from './useWishlistStore';
import { useFollowingStore } from './useFollowingStore';
import { useStreamStore } from './useStreamStore';

export const useStore = () => {
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();
  const followingStore = useFollowingStore();
  const streamStore = useStreamStore();

  return {
    // Cart
    cart: cartStore.cart,
    addToCart: cartStore.addToCart,
    removeFromCart: cartStore.removeFromCart,
    updateQuantity: cartStore.updateQuantity,
    
    // Wishlist
    wishlist: wishlistStore.wishlist,
    addToWishlist: wishlistStore.addToWishlist,
    removeFromWishlist: wishlistStore.removeFromWishlist,
    
    // Following
    followedCreators: followingStore.followedCreators,
    followCreator: followingStore.followCreator,
    unfollowCreator: followingStore.unfollowCreator,
    
    // Stream
    currentStreamIndex: streamStore.currentStreamIndex,
    setCurrentStreamIndex: streamStore.setCurrentStreamIndex,
    
    // Combined functions
    loadFromCookies: () => {
      cartStore.loadCartFromCookies();
      wishlistStore.loadWishlistFromCookies();
      followingStore.loadFollowingFromCookies();
    },
    
    saveToCookies: () => {
      cartStore.saveCartToCookies();
      wishlistStore.saveWishlistToCookies();
      followingStore.saveFollowingToCookies();
    }
  };
};