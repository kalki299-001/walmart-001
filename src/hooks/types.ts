export interface Stream {
  id: string;
  title: string;
  thumbnail_url: string | null;
  is_live: boolean;
  viewers_count: number;
  likes_count: number;
  creator?: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  product?: {
    id: string;
    name: string;
    price: number;
    original_price: number | null;
    description: string | null;
    category: string;
    images: string[];
    stock: number;
    sku: string | null;
  };
}