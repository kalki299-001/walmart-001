import { Button } from '@/components/ui/button';
import { Video, Plus, Settings, Layout } from 'lucide-react';

export const QuickActions = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="bg-red-600 hover:bg-red-700">
        <Video className="w-4 h-4 mr-2" />
        Start Live Stream
      </Button>
      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
        <Plus className="w-4 h-4 mr-2" />
        Schedule Stream
      </Button>
      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
        <Settings className="w-4 h-4 mr-2" />
        Stream Settings
      </Button>
      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
        <Layout className="w-4 h-4 mr-2" />
        Dashboard
      </Button>
    </div>
  );
};