
import { Play, Eye, Heart, ShoppingCart, Bookmark } from 'lucide-react';
import { LiveStream } from '@/store';

interface LiveCardProps {
  stream: LiveStream;
  onClick: () => void;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
}

export const LiveCard = ({ stream, onClick, onAddToCart, onAddToWishlist }: LiveCardProps) => {
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWishlist?.();
  };
  return (
    <div 
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-video">
        <img 
          src={stream.thumbnail} 
          alt={stream.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-black/50 rounded-full p-3">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
        
        {stream.isLive && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            LIVE
          </div>
        )}
        
        <div className="absolute bottom-3 right-3 flex items-center space-x-2 text-white text-sm">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{stream.viewers}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{stream.likes}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <img 
            src={stream.streamerAvatar} 
            alt={stream.streamerName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-white font-semibold">{stream.streamerName}</h3>
            <p className="text-gray-400 text-sm">{stream.title}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-white font-medium">{stream.productName}</h4>
          <div className="flex items-center space-x-2">
            <span className="text-red-500 font-bold text-lg">${stream.price}</span>
            {stream.originalPrice && (
              <span className="text-gray-400 line-through text-sm">${stream.originalPrice}</span>
            )}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleCardClick}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 px-4 rounded-full transition-colors"
            >
              Watch Now
            </button>
            {onAddToCart && (
              <button 
                onClick={handleAddToCart}
                className="bg-gray-700 hover:bg-gray-600 text-white p-1.5 rounded-full transition-colors"
                title="Add to Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            )}
            {onAddToWishlist && (
              <button 
                onClick={handleAddToWishlist}
                className="bg-gray-700 hover:bg-gray-600 text-white p-1.5 rounded-full transition-colors"
                title="Add to Wishlist"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
