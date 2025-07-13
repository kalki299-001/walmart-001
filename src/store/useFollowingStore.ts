import { create } from 'zustand';
import { FollowedCreator } from './types';

interface FollowingStore {
  followedCreators: FollowedCreator[];
  followCreator: (creator: FollowedCreator) => void;
  unfollowCreator: (id: string) => void;
  loadFollowingFromCookies: () => void;
  saveFollowingToCookies: () => void;
}

export const useFollowingStore = create<FollowingStore>((set, get) => ({
  followedCreators: [],

  followCreator: (creator) => {
    set((state) => {
      const newFollowed = [...state.followedCreators, creator];
      document.cookie = `followedCreators=${JSON.stringify(newFollowed)}; path=/; max-age=86400`;
      return { followedCreators: newFollowed };
    });
  },

  unfollowCreator: (id) => {
    set((state) => {
      const newFollowed = state.followedCreators.filter(creator => creator.id !== id);
      document.cookie = `followedCreators=${JSON.stringify(newFollowed)}; path=/; max-age=86400`;
      return { followedCreators: newFollowed };
    });
  },

  loadFollowingFromCookies: () => {
    try {
      const followedCreators = document.cookie.split('; ').find(row => row.startsWith('followedCreators='));
      if (followedCreators) {
        const followedData = JSON.parse(followedCreators.split('=')[1]);
        set({ followedCreators: followedData });
      }
    } catch (error) {
      console.error('Error loading following from cookies:', error);
    }
  },

  saveFollowingToCookies: () => {
    const { followedCreators } = get();
    document.cookie = `followedCreators=${JSON.stringify(followedCreators)}; path=/; max-age=86400`;
  }
}));