
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Menu } from 'lucide-react';
import { useWishlistItems, useRemoveFromWishlist, useAddToCart } from '@/hooks';

interface WishlistProps {
  onMenuClick: () => void;
}

export const Wishlist = ({ onMenuClick }: WishlistProps) => {
  const navigate = useNavigate();
  const { data: wishlistItems = [], isLoading } = useWishlistItems();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const addToCartMutation = useAddToCart();

  const handleAddToCart = (streamId: string) => {
    addToCartMutation.mutate(streamId);
    removeFromWishlistMutation.mutate(streamId);
  };

  const handleRemoveFromWishlist = (streamId: string) => {
    removeFromWishlistMutation.mutate(streamId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="text-gray-300 hover:text-white md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
        <h1 className="text-xl font-bold">My Wishlist</h1>
        <div className="w-16"></div>
      </div>

      {/* Wishlist Content */}
      <div className="p-6">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">Your wishlist is empty</p>
            <p className="text-gray-500 text-sm mb-6">Save products you love for later!</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-red-500/50 transition-colors">
                  <div className="relative">
                    <img 
                      src={item.stream?.thumbnail_url || ''} 
                      alt={item.stream?.product?.name || ''}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item.stream_id!)}
                      className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5 hover:bg-red-500/80 transition-colors"
                    >
                      <Heart className="w-3 h-3 fill-white text-white" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.stream?.product?.name}</h3>
                    <p className="text-gray-400 text-xs mb-1">by {item.stream?.creator?.name}</p>
                    <p className="text-red-500 font-bold text-sm mb-2">${item.stream?.product?.price}</p>
                    <button
                      onClick={() => handleAddToCart(item.stream_id!)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-colors text-xs"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
