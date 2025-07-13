
import { useState } from 'react';
import { Home, User, ShoppingCart, Package, Heart, Settings, LogOut, Users, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCartItems, useWishlistItems } from '@/hooks';
import { AuthButton } from '@/components/auth/AuthButton';
import { Settings as SettingsModal } from './Settings';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { data: cartItems = [] } = useCartItems();
  const { data: wishlistItems = [] } = useWishlistItems();
  
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const menuItems = [
    { icon: Home, label: 'For You', active: true, onClick: () => navigate('/') },
    { icon: Users, label: 'Following', onClick: () => navigate('/following') },
    { icon: Heart, label: 'Wishlist', onClick: () => navigate('/wishlist'), badge: wishlistItems.length },
    { icon: Video, label: 'Creator Studio', onClick: () => navigate('/creator-studio') },
    { icon: User, label: 'Profile' }
  ];

  const userActions = [
    { icon: ShoppingCart, label: 'Cart', badge: cartItemCount, onClick: () => navigate('/cart') },
    { icon: Package, label: 'Orders' },
    { icon: Settings, label: 'Settings', onClick: () => setIsSettingsOpen(true) }
  ];

  const handleItemClick = (item: any) => {
    if (item.onClick) {
      item.onClick();
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:z-auto md:top-0 md:h-screen`}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">抖</span>
            </div>
            <div>
              <h2 className="text-white font-semibold">Live Shop</h2>
              <p className="text-gray-400 text-sm">
                {user ? user.email : 'Sign in to continue'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu - Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-4">
            <div className="px-4 mb-4">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Menu</h3>
              <div className="space-y-1">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      item.active 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* User Actions */}
            <div className="px-4 mb-4">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Account</h3>
              <div className="space-y-1">
                {userActions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <AuthButton />
        </div>
      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};
