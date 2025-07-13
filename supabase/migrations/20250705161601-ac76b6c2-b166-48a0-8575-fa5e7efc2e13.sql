-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create creators table
CREATE TABLE public.creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar_url TEXT,
  followers_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create streams table
CREATE TABLE public.streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  thumbnail_url TEXT,
  product_name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  description TEXT,
  category TEXT NOT NULL,
  is_live BOOLEAN DEFAULT false,
  viewers_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create cart items table
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES public.streams(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, stream_id)
);

-- Create wishlist items table
CREATE TABLE public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES public.streams(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, stream_id)
);

-- Create following table
CREATE TABLE public.following (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, creator_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.following ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for creators (public read)
CREATE POLICY "Anyone can view creators" ON public.creators FOR SELECT USING (true);

-- Create RLS policies for streams (public read)
CREATE POLICY "Anyone can view streams" ON public.streams FOR SELECT USING (true);

-- Create RLS policies for cart items
CREATE POLICY "Users can view own cart items" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart items" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart items" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart items" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for wishlist items
CREATE POLICY "Users can view own wishlist items" ON public.wishlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wishlist items" ON public.wishlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own wishlist items" ON public.wishlist_items FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for following
CREATE POLICY "Users can view own following" ON public.following FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own following" ON public.following FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own following" ON public.following FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name, avatar_url)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample creators
INSERT INTO public.creators (name, avatar_url, followers_count) VALUES
('Tech Reviewer', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 1245),
('Gaming Guru', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 892),
('Digital Artist', 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face', 567),
('Budget Tech', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 445),
('Fashion Stylist', 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face', 678),
('Style Expert', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 534),
('Beauty Guru', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 892),
('Makeup Artist', 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face', 234);

-- Insert sample streams
INSERT INTO public.streams (creator_id, title, thumbnail_url, product_name, price, original_price, description, category, is_live, viewers_count, likes_count) VALUES
((SELECT id FROM public.creators WHERE name = 'Tech Reviewer'), 'MacBook Pro M3 Unboxing & Review', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=600&fit=crop', 'MacBook Pro 14" M3', 1999.00, 2299.00, 'Latest MacBook Pro with M3 chip, perfect for professionals', 'Electronics', true, 1245, 856),
((SELECT id FROM public.creators WHERE name = 'Gaming Guru'), 'Gaming Setup Tour & Laptop Demo', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop', 'Gaming Laptop RTX 4060', 899.00, 1099.00, 'High-performance gaming laptop with RTX graphics', 'Electronics', true, 892, 643),
((SELECT id FROM public.creators WHERE name = 'Digital Artist'), 'Surface Laptop Studio Review', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=600&fit=crop', 'Surface Laptop Studio', 1599.00, NULL, 'Creative professionals perfect 2-in-1 laptop', 'Electronics', false, 567, 234),
((SELECT id FROM public.creators WHERE name = 'Budget Tech'), 'Budget Laptop Comparison', 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=600&fit=crop', 'Budget Gaming Laptop', 699.00, 799.00, 'Affordable gaming laptop for casual gamers', 'Electronics', true, 445, 312),
((SELECT id FROM public.creators WHERE name = 'Fashion Stylist'), 'Designer Dress Collection', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop', 'Elegant Summer Dress', 149.00, 199.00, 'Beautiful floral print dress perfect for any occasion', 'Clothing', true, 678, 425),
((SELECT id FROM public.creators WHERE name = 'Style Expert'), 'Casual Wear Essentials', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop', 'Premium Cotton T-Shirt', 89.00, 120.00, 'Comfortable and stylish everyday wear', 'Clothing', true, 534, 298),
((SELECT id FROM public.creators WHERE name = 'Beauty Guru'), 'Skincare Routine Secrets', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=600&fit=crop', 'Anti-Aging Serum', 79.00, 99.00, 'Revolutionary skincare formula for younger looking skin', 'Beauty', true, 892, 567),
((SELECT id FROM public.creators WHERE name = 'Makeup Artist'), 'Makeup Tutorial Live', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop', 'Professional Makeup Kit', 45.00, 65.00, 'Complete makeup set for professional results', 'Beauty', false, 234, 189);