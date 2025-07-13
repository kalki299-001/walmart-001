-- Create products table with product-specific information
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  description TEXT,
  category TEXT NOT NULL,
  images TEXT[], -- Array of image URLs
  stock INTEGER DEFAULT 0,
  sku TEXT,
  attributes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on products (public read access)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for products (public read access)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- Create updated_at trigger for products
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, price, original_price, description, category, images, stock, sku) VALUES
('MacBook Pro 14" M3', 1999.00, 2299.00, 'Latest MacBook Pro with M3 chip, perfect for professionals', 'Electronics', ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=600&fit=crop'], 50, 'APPLE-MBP-M3-14'),
('Gaming Laptop RTX 4060', 899.00, 1099.00, 'High-performance gaming laptop with RTX graphics', 'Electronics', ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop'], 30, 'GAMING-RTX-4060'),
('Surface Laptop Studio', 1599.00, NULL, 'Creative professionals perfect 2-in-1 laptop', 'Electronics', ARRAY['https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=600&fit=crop'], 25, 'MS-SURFACE-STUDIO'),
('Budget Gaming Laptop', 699.00, 799.00, 'Affordable gaming laptop for casual gamers', 'Electronics', ARRAY['https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=600&fit=crop'], 40, 'BUDGET-GAMING'),
('Elegant Summer Dress', 149.00, 199.00, 'Beautiful floral print dress perfect for any occasion', 'Clothing', ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop'], 100, 'DRESS-SUMMER-001'),
('Premium Cotton T-Shirt', 89.00, 120.00, 'Comfortable and stylish everyday wear', 'Clothing', ARRAY['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop'], 200, 'TSHIRT-COTTON-001'),
('Anti-Aging Serum', 79.00, 99.00, 'Revolutionary skincare formula for younger looking skin', 'Beauty', ARRAY['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=600&fit=crop'], 150, 'SERUM-ANTIAGE-001'),
('Professional Makeup Kit', 45.00, 65.00, 'Complete makeup set for professional results', 'Beauty', ARRAY['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop'], 80, 'MAKEUP-KIT-PRO');

-- Add product_id to streams table and remove product-specific fields
ALTER TABLE public.streams ADD COLUMN product_id UUID REFERENCES public.products(id) ON DELETE CASCADE;

-- Update existing streams to link to products
UPDATE public.streams SET product_id = (
  SELECT id FROM public.products WHERE name = 
  CASE 
    WHEN streams.product_name = 'MacBook Pro 14" M3' THEN 'MacBook Pro 14" M3'
    WHEN streams.product_name = 'Gaming Laptop RTX 4060' THEN 'Gaming Laptop RTX 4060'
    WHEN streams.product_name = 'Surface Laptop Studio' THEN 'Surface Laptop Studio'
    WHEN streams.product_name = 'Budget Gaming Laptop' THEN 'Budget Gaming Laptop'
    WHEN streams.product_name = 'Elegant Summer Dress' THEN 'Elegant Summer Dress'
    WHEN streams.product_name = 'Premium Cotton T-Shirt' THEN 'Premium Cotton T-Shirt'
    WHEN streams.product_name = 'Anti-Aging Serum' THEN 'Anti-Aging Serum'
    WHEN streams.product_name = 'Professional Makeup Kit' THEN 'Professional Makeup Kit'
  END
  LIMIT 1
);

-- Remove product-specific columns from streams table (keep them temporarily commented for safety)
-- We'll remove these after confirming the migration works
-- ALTER TABLE public.streams DROP COLUMN product_name;
-- ALTER TABLE public.streams DROP COLUMN price;
-- ALTER TABLE public.streams DROP COLUMN original_price;
-- ALTER TABLE public.streams DROP COLUMN description;
-- ALTER TABLE public.streams DROP COLUMN category;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_streams_product_id ON public.streams(product_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);