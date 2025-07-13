
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { LiveCard } from '@/components/LiveCard';
import { useStreamSearch, useAddToCart, useAddToWishlist } from '@/hooks';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useMemo } from 'react';

const categories = [
  'All', 'Electronics', 'Clothing', 'Beauty'
];

interface HomeProps {
  onMenuClick: () => void;
}

export const Home = ({ onMenuClick }: HomeProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: streams = [], isLoading } = useStreamSearch(searchQuery);
  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  
  const filteredStreams = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? streams 
      : streams.filter(stream => stream.product?.category === selectedCategory);

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(stream => 
        stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stream.product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stream.creator?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => Number(a.product?.price || 0) - Number(b.product?.price || 0));
    } else if (filterBy === 'popular') {
      filtered = [...filtered].sort((a, b) => (b.viewers_count || 0) - (a.viewers_count || 0));
    }

    return filtered;
  }, [streams, selectedCategory, searchQuery, sortBy, filterBy]);

  const handleStreamClick = (streamId: string) => {
    navigate(`/live/${streamId}`);
  };

  const handleAddToCart = (stream: any) => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    addToCartMutation.mutate(stream.id);
  };

  const handleAddToWishlist = (stream: any) => {
    if (!user) {
      toast.error('Please sign in to add items to wishlist');
      return;
    }
    addToWishlistMutation.mutate(stream.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header 
        onMenuClick={onMenuClick} 
        onSearch={setSearchQuery}
        onSort={setSortBy}
        onFilter={setFilterBy}
      />
      
      <main className="pt-20 pb-4 h-screen overflow-y-auto w-full">
          {/* Categories */}
          <div className="px-6 py-4 w-full">
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Live Streams Grid - Full width */}
          <div className="px-6 w-full">
            {filteredStreams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
                {filteredStreams.map((stream) => (
                  <LiveCard
                    key={stream.id}
                     stream={{
                       id: stream.id,
                       title: stream.title,
                       streamerName: stream.creator?.name || 'Unknown',
                       streamerAvatar: stream.creator?.avatar_url || '',
                       thumbnail: stream.thumbnail_url || '',
                       price: Number(stream.product?.price || 0),
                       originalPrice: stream.product?.original_price ? Number(stream.product.original_price) : undefined,
                       isLive: stream.is_live,
                       viewers: stream.viewers_count,
                       likes: stream.likes_count,
                       productName: stream.product?.name || '',
                       description: stream.product?.description || '',
                       category: stream.product?.category || ''
                     }}
                    onClick={() => handleStreamClick(stream.id)}
                    onAddToCart={() => handleAddToCart(stream)}
                    onAddToWishlist={() => handleAddToWishlist(stream)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 w-full">
                <p className="text-gray-400 text-lg">No products found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
          
          {/* Recommended Section */}
          {selectedCategory === 'All' && filteredStreams.length > 0 && (
            <div className="px-6 mt-8 w-full">
              <h2 className="text-white text-xl font-bold mb-4">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
                {filteredStreams.slice(0, 5).map((stream) => (
                  <LiveCard
                    key={`rec-${stream.id}`}
                     stream={{
                       id: stream.id,
                       title: stream.title,
                       streamerName: stream.creator?.name || 'Unknown',
                       streamerAvatar: stream.creator?.avatar_url || '',
                       thumbnail: stream.thumbnail_url || '',
                       price: Number(stream.product?.price || 0),
                       originalPrice: stream.product?.original_price ? Number(stream.product.original_price) : undefined,
                       isLive: stream.is_live,
                       viewers: stream.viewers_count,
                       likes: stream.likes_count,
                       productName: stream.product?.name || '',
                       description: stream.product?.description || '',
                       category: stream.product?.category || ''
                     }}
                    onClick={() => handleStreamClick(stream.id)}
                    onAddToCart={() => handleAddToCart(stream)}
                    onAddToWishlist={() => handleAddToWishlist(stream)}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
    </>
  );
};
