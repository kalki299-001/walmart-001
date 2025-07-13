
-- Add video_url field to streams table
ALTER TABLE public.streams ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Update existing streams with video URLs and create some dummy data
-- First, let's update existing streams with video URLs based on their categories

-- Electronics streams (smartphones, laptops, headphones)
UPDATE public.streams 
SET video_url = CASE 
  WHEN product_name ILIKE '%phone%' OR product_name ILIKE '%smartphone%' THEN 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//smartphone.mp4'
  WHEN product_name ILIKE '%laptop%' OR product_name ILIKE '%macbook%' THEN 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//smartphone2.mp4'
  WHEN product_name ILIKE '%headphone%' THEN 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//headphone.mp4'
  ELSE video_url
END
WHERE category = 'Electronics';

-- Clothing streams
UPDATE public.streams 
SET video_url = CASE 
  WHEN product_name ILIKE '%dress%' OR product_name ILIKE '%shirt%' OR product_name ILIKE '%clothing%' THEN 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//cloth.mp4'
  WHEN product_name ILIKE '%shoe%' THEN 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//shoe.mp4'
  ELSE video_url
END
WHERE category = 'Clothing';

-- Beauty streams
UPDATE public.streams 
SET video_url = 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//lipstick.mp4'
WHERE category = 'Beauty';

-- Insert additional dummy streams to showcase all video types
INSERT INTO public.streams (title, thumbnail_url, product_name, price, original_price, description, category, is_live, viewers_count, likes_count, video_url, creator_id) VALUES
-- Electronics
('Latest iPhone 15 Pro Max Review!', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=600&fit=crop', 'iPhone 15 Pro Max', 1199.00, 1299.00, 'Experience the most advanced iPhone ever with titanium design and pro camera system', 'Electronics', true, 2847, 156, 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//smartphone.mp4', (SELECT id FROM creators LIMIT 1)),

('Samsung Galaxy S24 Ultra Unboxing', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop', 'Samsung Galaxy S24 Ultra', 999.00, 1199.00, 'The ultimate Android flagship with S Pen and AI features', 'Electronics', false, 1923, 89, 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//smartphone2.mp4', (SELECT id FROM creators LIMIT 1)),

('Premium Wireless Headphones Test', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop', 'Sony WH-1000XM5 Headphones', 349.00, 399.00, 'Industry-leading noise cancellation and premium sound quality', 'Electronics', true, 1456, 234, 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//headphone.mp4', (SELECT id FROM creators LIMIT 1)),

-- Clothing
('Summer Fashion Haul 2024', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop', 'Floral Summer Dress', 79.00, 99.00, 'Perfect lightweight dress for summer occasions', 'Clothing', true, 3421, 287, 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//cloth.mp4', (SELECT id FROM creators LIMIT 1)),

('Streetwear Collection Drop', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop', 'Oversized Hoodie', 89.00, 119.00, 'Comfortable oversized hoodie perfect for casual wear', 'Clothing', false, 2156, 145, 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//cloth.mp4', (SELECT id FROM creators LIMIT 1)),

('Sneaker Review & Styling Tips', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop', 'Nike Air Jordan 1 High', 169.00, 199.00, 'Classic basketball sneaker with timeless design', 'Clothing', true, 1876, 198, 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//shoe.mp4', (SELECT id FROM creators LIMIT 1)),

-- Beauty
('Perfect Red Lipstick Application', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=600&fit=crop', 'Matte Red Lipstick', 24.00, 32.00, 'Long-lasting matte formula in classic red shade', 'Beauty', true, 4532, 456, 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//lipstick.mp4', (SELECT id FROM creators LIMIT 1)),

('Glossy Lip Look Tutorial', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop', 'Glossy Pink Lip Gloss', 18.00, 25.00, 'High-shine gloss for that perfect glossy lip look', 'Beauty', false, 2987, 312, 'https://jxjuoqgkthqdyaevhqaj.supabase.co/storage/v1/object/public/bucket1//lipstick.mp4', (SELECT id FROM creators LIMIT 1));
