import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const StreamSetup = () => {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Stream Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Stream Title
          </label>
          <Input
            placeholder="Enter your stream title..."
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Stream Key (for OBS/External Software)
          </label>
          <div className="relative">
            <Input
              type="password"
              value="rtmp://live.example.com/stream/abc123xyz"
              readOnly
              className="bg-gray-800 border-gray-700 text-white pr-20"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              Copy
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Stream URL
          </label>
          <Input
            value="rtmp://live.example.com/stream/"
            readOnly
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div className="flex gap-4">
          <Button className="bg-green-600 hover:bg-green-700">
            Start Stream
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
            Test Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};