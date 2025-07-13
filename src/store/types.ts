export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  streamerName: string;
}

export interface FollowedCreator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  streams: LiveStream[];
}

export interface LiveStream {
  id: string;
  title: string;
  streamerName: string;
  streamerAvatar: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  isLive: boolean;
  viewers: number;
  likes: number;
  productName: string;
  description: string;
  category: string;
}