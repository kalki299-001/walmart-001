
# Sample Data for Supabase Tables

This folder contains CSV files with sample data for your livestream shopping platform. Here's how to upload them to your Supabase tables:

## Upload Order (Important!)

Upload the CSV files in this exact order to maintain foreign key relationships:

1. **creators.csv** - Upload to `creators` table first
2. **products.csv** - Upload to `products` table 
3. **streams.csv** - Upload to `streams` table (depends on creators and products)
4. **profiles.csv** - Upload to `profiles` table
5. **cart_items.csv** - Upload to `cart_items` table (depends on profiles and streams)
6. **wishlist_items.csv** - Upload to `wishlist_items` table (depends on profiles and streams)
7. **following.csv** - Upload to `following` table (depends on profiles and creators)
8. **user_interactions.csv** - Upload to `user_interactions` table (depends on profiles and streams)

## How to Upload

1. Go to your Supabase dashboard
2. Navigate to the Table Editor
3. Select each table
4. Click the "Insert" button and choose "Upload CSV"
5. Upload the corresponding CSV file
6. Make sure to match column names correctly

## Sample Data Includes

- **5 Creators**: TechReviewer, FashionGuru, BeautyExpert, GamingPro, FitnessCoach
- **10 Products**: Electronics (MacBook, iPhone, Gaming Laptop, Headphones), Clothing (Dress, T-Shirt, Sneakers), Beauty (Serum, Lipstick, Makeup Kit)
- **10 Live Streams**: Various product demonstrations and reviews
- **3 User Profiles**: Sample users with different preferences
- **Sample Cart Items**: Users with items in their shopping carts
- **Sample Wishlist Items**: Users with saved items
- **Sample Following**: Users following different creators
- **Sample User Interactions**: Tracking user engagement with streams

## Notes

- All UUIDs are pre-generated to maintain relationships
- Video URLs point to existing videos in your Supabase storage
- Image URLs use Unsplash for consistent, high-quality thumbnails and avatars
- Timestamps are set to January 2024 for consistency
- Products include realistic pricing and descriptions
- User interactions include common e-commerce actions (viewed, clicked, added_to_cart, added_to_wishlist)

After uploading this data, your application should have proper sample content to work with and all TypeScript errors should be resolved.
