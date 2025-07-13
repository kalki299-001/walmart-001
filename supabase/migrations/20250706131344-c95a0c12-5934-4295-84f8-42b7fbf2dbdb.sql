-- Add missing fields to streams table to match comprehensive product/livestream schema
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS start_time TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS end_time TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'live' CHECK (status IN ('upcoming', 'live', 'ended'));
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS peak_viewers INTEGER DEFAULT 0;
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS avg_watch_time INTEGER DEFAULT 0;
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS click_through_rate DECIMAL(5,4) DEFAULT 0;
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS trending_score DECIMAL(10,4) DEFAULT 0;
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS sku TEXT;
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS attributes JSONB;

-- Add missing fields to creators table
ALTER TABLE public.creators ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE public.creators ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE public.creators ADD COLUMN IF NOT EXISTS avg_engagement_rate DECIMAL(5,4) DEFAULT 0;
ALTER TABLE public.creators ADD COLUMN IF NOT EXISTS top_categories TEXT[];

-- Create user_interactions table for AI recommendations and analytics
CREATE TABLE IF NOT EXISTS public.user_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  stream_id UUID REFERENCES public.streams(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('viewed', 'clicked', 'purchased', 'added_to_cart', 'added_to_wishlist')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  watch_duration INTEGER DEFAULT 0,
  device_type TEXT,
  session_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_interactions
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_interactions
CREATE POLICY "Users can view own interactions" 
ON public.user_interactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interactions" 
ON public.user_interactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_id ON public.user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_stream_id ON public.user_interactions(stream_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_action ON public.user_interactions(action);
CREATE INDEX IF NOT EXISTS idx_streams_status ON public.streams(status);
CREATE INDEX IF NOT EXISTS idx_streams_tags ON public.streams USING GIN(tags);