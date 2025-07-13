import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Users, Heart, ShoppingCart } from 'lucide-react';

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-2xl font-bold text-white">145.2K</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Followers</p>
              <p className="text-2xl font-bold text-white">23.8K</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Likes</p>
              <p className="text-2xl font-bold text-white">89.4K</p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-white">$12.5K</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};