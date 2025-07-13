import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export const useFollowing = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['following', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('following')
        .select(`
          *,
          creator:creators(*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });
};

export const useFollowCreator = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (creatorId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('following')
        .insert({
          user_id: user.id,
          creator_id: creatorId
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following'] });
      toast.success('Now following creator!');
    },
    onError: () => {
      toast.error('Failed to follow creator');
    }
  });
};

export const useUnfollowCreator = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (creatorId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('following')
        .delete()
        .eq('user_id', user.id)
        .eq('creator_id', creatorId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following'] });
      toast.success('Unfollowed creator');
    },
    onError: () => {
      toast.error('Failed to unfollow creator');
    }
  });
};