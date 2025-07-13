import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export const useCartItems = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['cart-items', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('cart_items')
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

export const useAddToCart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (streamId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          stream_id: streamId,
          quantity: 1
        }, {
          onConflict: 'user_id,stream_id',
          ignoreDuplicates: false
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      toast.success('Item added to cart!');
    },
    onError: (error) => {
      toast.error('Failed to add item to cart');
      console.error(error);
    }
  });
};

export const useRemoveFromCart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (streamId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('stream_id', streamId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      toast.success('Item removed from cart');
    },
    onError: () => {
      toast.error('Failed to remove item from cart');
    }
  });
};