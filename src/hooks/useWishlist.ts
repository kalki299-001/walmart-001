import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export const useWishlistItems = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['wishlist-items', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          *,
          stream:streams(
            *,
            creator:creators(id, name, avatar_url),
            product:products(*)
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });
};

export const useAddToWishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (streamId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          stream_id: streamId
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-items'] });
      toast.success('Item added to wishlist!');
    },
    onError: () => {
      toast.error('Failed to add item to wishlist');
    }
  });
};

export const useRemoveFromWishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (streamId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('stream_id', streamId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-items'] });
      toast.success('Item removed from wishlist');
    },
    onError: () => {
      toast.error('Failed to remove item from wishlist');
    }
  });
};