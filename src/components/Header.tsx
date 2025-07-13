
import { ShoppingCart, Menu, Search, Filter, SortAsc } from 'lucide-react';
import { useStore } from '@/store';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  showSearch?: boolean;
  title?: string;
  onMenuClick?: () => void;
  onSearch?: (query: string) => void;
  onSort?: (sortBy: string) => void;
  onFilter?: (filter: string) => void;
}

export const Header = ({ 
  title = "Live Shop", 
  onMenuClick, 
  showSearch = true,
  onSearch,
  onSort,
  onFilter 
}: HeaderProps) => {
  const { cart } = useStore();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <button onClick={onMenuClick} className="md:hidden">
            <Menu className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-10"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Filter and Sort buttons */}
        {showSearch && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSort?.('price')}
              className="text-gray-400 hover:text-white"
            >
              <SortAsc className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFilter?.('popular')}
              className="text-gray-400 hover:text-white"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        <div className="relative ml-4">
          <ShoppingCart className="w-6 h-6 text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
