
import { useState, useEffect, useCallback } from 'react';
import { MessageCircle, ShoppingCart, Heart, Share, ChevronUp, ChevronDown, ArrowLeft, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAddToCart, useAddToWishlist, useRemoveFromWishlist, useWishlistItems, useStreams } from '@/hooks';
import toast from 'react-hot-toast';

export const LivePlayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { data: streams = [] } = useStreams();
  const { data: wishlistItems = [] } = useWishlistItems();
  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const [showChat, setShowChat] = useState(false);
  const [liked, setLiked] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'TechFan123', message: 'This looks amazing!', color: 'text-blue-400' },
    { id: 2, user: 'ShopperPro', message: 'What\'s the discount?', color: 'text-green-400' },
    { id: 3, user: 'GamerGirl', message: 'Adding to cart now!', color: 'text-purple-400' }
  ]);
  
  const currentStream = streams.find(stream => stream.id === id);
  const isInWishlist = currentStream ? wishlistItems.some(item => item.stream_id === currentStream.id) : false;

  // Get streams from the same category for scrolling
  const getSameCategoryStreams = () => {
    if (!currentStream?.product?.category) return [];
    return streams.filter(stream => stream.product?.category === currentStream.product?.category);
  };

  const handleNextVideo = useCallback(() => {
    const sameCategoryStreams = getSameCategoryStreams();
    if (sameCategoryStreams.length <= 1) return;
    
    const currentIndexInCategory = sameCategoryStreams.findIndex(stream => stream.id === currentStream?.id);
    const nextIndexInCategory = (currentIndexInCategory + 1) % sameCategoryStreams.length;
    const nextStream = sameCategoryStreams[nextIndexInCategory];
    
    navigate(`/live/${nextStream.id}`, { replace: true });
  }, [currentStream, streams, navigate]);

  const handlePreviousVideo = useCallback(() => {
    const sameCategoryStreams = getSameCategoryStreams();
    if (sameCategoryStreams.length <= 1) return;
    
    const currentIndexInCategory = sameCategoryStreams.findIndex(stream => stream.id === currentStream?.id);
    const prevIndexInCategory = currentIndexInCategory === 0 ? sameCategoryStreams.length - 1 : currentIndexInCategory - 1;
    const prevStream = sameCategoryStreams[prevIndexInCategory];
    
    navigate(`/live/${prevStream.id}`, { replace: true });
  }, [currentStream, streams, navigate]);

  // Add scroll event listener for navigation
  useEffect(() => {
    let isScrolling = false;
    
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      isScrolling = true;
      
      if (e.deltaY > 0) {
        handleNextVideo();
      } else {
        handlePreviousVideo();
      }
      
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePreviousVideo();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextVideo();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextVideo, handlePreviousVideo]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    if (currentStream) {
      addToCartMutation.mutate(currentStream.id);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (!user) {
      toast.error('Please sign in to add items to wishlist');
      return;
    }
    if (currentStream) {
      if (isInWishlist) {
        const wishlistItem = wishlistItems.find(item => item.stream_id === currentStream.id);
        if (wishlistItem) {
          removeFromWishlistMutation.mutate(wishlistItem.id);
        }
      } else {
        addToWishlistMutation.mutate(currentStream.id);
      }
    }
  };

  const handleArtistClick = () => {
    if (currentStream?.creator?.name) {
      navigate(`/creator/${currentStream.creator.name.replace(/\s+/g, '-').toLowerCase()}`);
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: 'You',
        message: chatMessage,
        color: 'text-red-400'
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!currentStream) return null;

  const sameCategoryStreams = getSameCategoryStreams();
  const canGoUp = sameCategoryStreams.length > 1;
  const canGoDown = sameCategoryStreams.length > 1;

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-[200] bg-black/50 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-black/70"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      {/* Video Container */}
      <div className="relative w-full h-full">
        <img 
          src={currentStream.thumbnail_url || ''}
          alt={currentStream.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Live Indicator */}
        {currentStream.is_live && (
          <div className="absolute top-16 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-[100]">
            LIVE
          </div>
        )}

        {/* Category Indicator */}
        <div className="absolute top-16 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm z-[100]">
          {currentStream.product?.category}
        </div>
        
        {/* Right Sidebar Actions */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6 z-[150]">
          {/* Up Arrow - Previous Video */}
          <button 
            onClick={handlePreviousVideo}
            className={`bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all cursor-pointer ${
              canGoUp ? 'hover:bg-black/70' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canGoUp}
          >
            <ChevronUp className={`w-7 h-7 ${canGoUp ? 'text-white' : 'text-gray-500'}`} />
          </button>
          
          {/* Like Button */}
          <div className="flex flex-col items-center space-y-2">
            <button 
              onClick={() => setLiked(!liked)}
              className={`p-3 rounded-full transition-all cursor-pointer ${liked ? 'bg-red-500 hover:bg-red-600' : 'bg-black/50 hover:bg-black/70'} backdrop-blur-sm`}
            >
              <Heart className={`w-7 h-7 ${liked ? 'text-white fill-white' : 'text-white'}`} />
            </button>
            <span className="text-lg">{currentStream.likes_count + (liked ? 1 : 0)}</span>
          </div>
          
          {/* Chat Button */}
          <div className="flex flex-col items-center space-y-2">
            <button 
              onClick={() => setShowChat(!showChat)}
              className="bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all hover:bg-black/70 cursor-pointer"
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </button>
            <span className="text-white text-sm font-medium">Chat</span>
          </div>
          
          {/* Share Button */}
          <div className="flex flex-col items-center space-y-2">
            <button className="bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all hover:bg-black/70 cursor-pointer">
              <Share className="w-7 h-7 text-white" />
            </button>
            <span className="text-white text-sm font-medium">Share</span>
          </div>

          {/* Down Arrow - Next Video */}
          <button 
            onClick={handleNextVideo}
            className={`bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all cursor-pointer ${
              canGoDown ? 'hover:bg-black/70' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canGoDown}
          >
            <ChevronDown className={`w-7 h-7 ${canGoDown ? 'text-white' : 'text-gray-500'}`} />
          </button>
        </div>
        
        {/* Bottom Info - Lower z-index when chat is open */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 space-y-4 transition-all duration-300 ${showChat ? 'z-[80]' : 'z-[100]'}`}>
          {/* Streamer Info */}
          <div className="flex items-center space-x-3">
            <button onClick={handleArtistClick} className="cursor-pointer">
              <img 
                src={currentStream.creator?.avatar_url || ''}
                alt={currentStream.creator?.name || ''}
                className="w-12 h-12 rounded-full border-2 border-white hover:border-red-500 transition-colors"
              />
            </button>
            <div>
              <button onClick={handleArtistClick} className="cursor-pointer">
                <h3 className="text-white font-semibold hover:text-red-400 transition-colors">{currentStream.creator?.name || 'Unknown'}</h3>
              </button>
              <p className="text-gray-300 text-sm">{currentStream.viewers_count} watching</p>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4">
            <h4 className="text-white font-semibold text-lg">{currentStream.product?.name}</h4>
            <p className="text-gray-300 text-sm mb-2">{currentStream.product?.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-red-500 font-bold text-2xl">${currentStream.product?.price}</span>
                {currentStream.product?.original_price && (
                  <span className="text-gray-400 line-through text-lg">${currentStream.product.original_price}</span>
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleWishlistToggle}
                  className={`font-semibold py-2 px-4 rounded-full transition-colors flex items-center space-x-2 cursor-pointer ${
                    isInWishlist 
                      ? 'bg-pink-500 hover:bg-pink-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-white' : ''}`} />
                  <span>{isInWishlist ? 'Wishlisted' : 'Wishlist'}</span>
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition-colors cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Chat Overlay - Higher z-index */}
      {showChat && (
        <div className="absolute bottom-0 right-0 w-80 h-96 bg-black/90 backdrop-blur-sm rounded-tl-2xl p-4 flex flex-col z-[200]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Live Chat</h3>
            <button 
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-white text-xl cursor-pointer"
            >
              ×
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 text-sm mb-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="text-gray-300">
                <span className={msg.color}>{msg.user}:</span> {msg.message}
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-2 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
