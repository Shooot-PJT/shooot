import { create } from 'zustand';

interface FlyOutState {
  open: boolean;
  toggle: () => void;
}

export const useFlyOutStore = create<FlyOutState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));
