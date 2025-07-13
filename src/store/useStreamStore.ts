import { create } from 'zustand';

interface StreamStore {
  currentStreamIndex: number;
  setCurrentStreamIndex: (index: number) => void;
}

export const useStreamStore = create<StreamStore>((set) => ({
  currentStreamIndex: 0,
  setCurrentStreamIndex: (index) => set({ currentStreamIndex: index }),
}));