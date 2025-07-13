
import { useParams, useNavigate } from 'react-router-dom';
import { useStreams, useFollowing, useFollowCreator, useUnfollowCreator } from '@/hooks';
import { ArrowLeft, Users, Heart, Play, Menu, UserPlus, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface CreatorProps {
  onMenuClick: () => void;
}

export const Creator = ({ onMenuClick }: CreatorProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: streams = [] } = useStreams();
  const { data: following = [] } = useFollowing();
  const followCreatorMutation = useFollowCreator();
  const unfollowCreatorMutation = useUnfollowCreator();

  // Find creator's streams - for now using streamer name from URL
  const creatorName = id?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  const creatorStreams = streams.filter(stream => 
    stream.creator?.name.toLowerCase() === creatorName.toLowerCase()
  );

  const creator = creatorStreams.length > 0 ? {
    id: creatorStreams[0].creator?.id || '',
    name: creatorStreams[0].creator?.name || '',
    avatar: creatorStreams[0].creator?.avatar_url || '',
    followers: (creatorStreams[0].creator as any)?.followers_count || 0,
    totalLikes: creatorStreams.reduce((sum, stream) => sum + (stream.likes_count || 0), 0),
    streams: creatorStreams
  } : null;

  const isFollowing = creator && following.some(f => f.creator?.id === creator.id);

  const handleFollowToggle = () => {
    if (!creator || !user) return;
    
    if (isFollowing) {
      unfollowCreatorMutation.mutate(creator.id);
    } else {
      followCreatorMutation.mutate(creator.id);
    }
  };

  const handleStreamClick = (streamId: string) => {
    navigate(`/live/${streamId}`);
  };

  if (!creator) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Creator not found</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            Back to Home
          </button>
        </div>
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
        <h1 className="text-xl font-bold">{creator.name}</h1>
        <div className="w-16"></div>
      </div>

      {/* Creator Profile Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-6 mb-6">
            <img 
              src={creator.avatar} 
              alt={creator.name}
              className="w-24 h-24 rounded-full border-4 border-red-500"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">{creator.name}</h2>
              <div className="flex items-center space-x-6 text-gray-400 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span className="text-lg">{creator.followers.toLocaleString()}</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span className="text-lg">{creator.totalLikes.toLocaleString()}</span>
                  <span className="text-sm">Likes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span className="text-lg">{creator.streams.length}</span>
                  <span className="text-sm">Videos</span>
                </div>
              </div>
              {user ? (
                <button 
                  onClick={handleFollowToggle}
                  disabled={followCreatorMutation.isPending || unfollowCreatorMutation.isPending}
                  className={`px-8 py-3 rounded-full transition-colors font-semibold flex items-center space-x-2 ${
                    isFollowing 
                      ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {isFollowing ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  <span>{isFollowing ? 'Following' : 'Follow'}</span>
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/')}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full transition-colors font-semibold"
                >
                  Sign in to Follow
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Creator's Videos Section */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Videos</h3>
            <span className="text-gray-400">{creator.streams.length} videos</span>
          </div>
          
          {creator.streams.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No videos available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {creator.streams.map((stream) => (
                <div 
                  key={stream.id}
                  onClick={() => handleStreamClick(stream.id)}
                  className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors border border-gray-800 hover:border-red-500/50"
                >
                  <div className="relative">
                    <img 
                      src={stream.thumbnail_url || ''}
                      alt={stream.title}
                      className="w-full h-32 object-cover"
                    />
                    {stream.is_live && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                        LIVE
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-xs">
                      {stream.viewers_count}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{stream.product?.name}</h4>
                    <p className="text-red-500 font-bold text-sm">${stream.product?.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
