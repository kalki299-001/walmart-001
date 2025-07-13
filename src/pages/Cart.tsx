
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Menu } from 'lucide-react';
import { useCartItems, useRemoveFromCart } from '@/hooks';

interface CartProps {
  onMenuClick: () => void;
}

export const Cart = ({ onMenuClick }: CartProps) => {
  const navigate = useNavigate();
  const { data: cartItems = [], isLoading } = useCartItems();
  const removeFromCartMutation = useRemoveFromCart();

  const total = cartItems.reduce((sum, item) => sum + (item.stream?.product?.price || 0) * item.quantity, 0);

  const handleRemoveFromCart = (streamId: string) => {
    removeFromCartMutation.mutate(streamId);
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
        <h1 className="text-xl font-bold">Shopping Cart</h1>
        <div className="w-16"></div>
      </div>

      {/* Cart Content */}
      <div className="p-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
            <p className="text-gray-500 text-sm mb-6">Add some products from live streams!</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Cart Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                  <div className="relative">
                    <img 
                      src={item.stream?.thumbnail_url || ''} 
                      alt={item.stream?.product?.name || ''}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveFromCart(item.stream_id!)}
                      className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5 hover:bg-red-500/80 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.stream?.product?.name}</h3>
                    <p className="text-gray-400 text-xs mb-1">by {item.stream?.creator?.name}</p>
                    <p className="text-red-500 font-bold text-sm mb-2">${item.stream?.product?.price}</p>
                    
                    {/* Quantity */}
                    <div className="text-center mb-2">
                      <span className="text-sm text-gray-400">Qty: {item.quantity}</span>
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-center">
                      <p className="text-white font-bold text-sm">${((item.stream?.product?.price || 0) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">Total Items:</span>
                <span className="text-xl font-bold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-semibold">Grand Total:</span>
                <span className="text-3xl font-bold text-red-500">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-colors text-lg">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
