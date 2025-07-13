import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { useStreams } from '@/hooks';

export const RecentStreams = () => {
  const { data: streams = [] } = useStreams();
  const myStreams = streams.slice(0, 3); // Mock user's streams

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Streams</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {myStreams.map((stream) => (
            <div key={stream.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{stream.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {stream.viewers_count} viewers • {stream.likes_count} likes
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={stream.is_live ? "destructive" : "secondary"}>
                  {stream.is_live ? "Live" : "Ended"}
                </Badge>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  View Analytics
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};