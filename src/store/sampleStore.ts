import { create } from 'zustand';

export interface ISampleStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useSampleStore = create<ISampleStore>((set) => ({
  count: 0,
  increment: () => set((state: { count: number }) => ({ count: state.count + 1 })),
  decrement: () => set((state: { count: number }) => ({ count: state.count - 1 })),
}));

export default useSampleStore;
