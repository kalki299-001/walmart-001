
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Stream } from './types';

export const useStreams = () => {
  return useQuery({
    queryKey: ['streams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('streams')
        .select(`
          *,
          creator:creators(id, name, avatar_url),
          product:products(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Stream[];
    }
  });
};
