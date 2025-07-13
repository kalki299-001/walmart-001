
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Play, Menu } from 'lucide-react';
import { useFollowing } from '@/hooks';

interface FollowingProps {
  onMenuClick: () => void;
}

export const Following = ({ onMenuClick }: FollowingProps) => {
  const navigate = useNavigate();
  const { data: following = [], isLoading } = useFollowing();

  const handleCreatorClick = (creatorName: string) => {
    const formattedName = creatorName.toLowerCase().replace(/ /g, '-');
    navigate(`/creator/${formattedName}`);
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
        <h1 className="text-xl font-bold">Following</h1>
        <div className="w-16"></div>
      </div>

      {/* Following List */}
      <div className="p-4">
        {following.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">You're not following anyone yet</p>
            <p className="text-gray-500 text-sm">Follow creators to see their latest streams!</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Discover Creators
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {following.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleCreatorClick(item.creator?.name || '')}
                className="bg-gray-900 rounded-lg p-4 cursor-pointer hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.creator?.avatar_url || ''} 
                    alt={item.creator?.name}
                    className="w-16 h-16 rounded-full border-2 border-red-500"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.creator?.name}</h3>
                    <p className="text-gray-400">{item.creator?.followers_count || 0} followers</p>
                    {item.creator?.is_verified && (
                      <p className="text-blue-400 text-sm">✓ Verified</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-red-500">
                    <Play className="w-5 h-5" />
                    <span className="text-sm">View Streams</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
