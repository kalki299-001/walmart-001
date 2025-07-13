import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useProductSearch } from '@/hooks';
import { ProductCard } from '@/components/ProductCard';

export const ProductSelection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const { data: products = [], isLoading } = useProductSearch(searchQuery);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Select Products for Next Stream</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-400">Loading products...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id)}
                onSelect={toggleProductSelection}
              />
            ))}
          </div>
        )}
        
        {selectedProducts.length > 0 && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h4 className="text-white font-medium mb-2">
              Selected Products ({selectedProducts.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((productId) => {
                const product = products.find(p => p.id === productId);
                return (
                  <Badge key={productId} variant="secondary" className="bg-red-600 text-white">
                    {product?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};