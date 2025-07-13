import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number | null;
  images?: string[] | null;
}

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
  onSelect?: (productId: string) => void;
  showActions?: boolean;
}

export const ProductCard = ({ product, isSelected, onSelect, showActions = false }: ProductCardProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(product.id);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
        isSelected
          ? 'border-red-500 bg-red-500/10'
          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
      }`}
      onClick={handleClick}
    >
      <div className="aspect-square bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-gray-400 text-sm">Product Image</div>
        )}
      </div>
      <h3 className="font-medium text-white mb-1">{product.name}</h3>
      <p className="text-green-400 font-semibold">${product.price}</p>
      <div className="flex items-center justify-between mt-2">
        <Badge variant="secondary" className="bg-gray-700 text-gray-300">
          {product.category}
        </Badge>
        <span className="text-gray-400 text-sm">{product.stock || 0} in stock</span>
      </div>
    </div>
  );
};