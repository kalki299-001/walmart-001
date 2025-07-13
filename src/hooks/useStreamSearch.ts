import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useStreamSearch = (searchQuery: string, debounceMs: number = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  return useQuery({
    queryKey: ['streams', 'search', debouncedQuery],
    queryFn: async () => {
      let query = supabase
        .from('streams')
        .select(`
          *,
          creator:creators(*),
          product:products(*)
        `)
        .order('created_at', { ascending: false });

      if (debouncedQuery) {
        query = query.or(`title.ilike.%${debouncedQuery}%,product.name.ilike.%${debouncedQuery}%`);
      }

      const { data, error } = await query.limit(50);
      
      if (error) throw error;
      return data;
    },
    enabled: true,
  });
};