import { ReactNode } from 'react';
import { create } from 'zustand';

interface Modal {
  content: ReactNode;
  animation: 'center' | 'bottom';
  onOpen: () => void;
  onClose: () => void;
}

interface ModalState {
  modals: Modal[];
}

interface Action {
  pushModal: (modal: Modal) => void;
  popModal: () => void;
  updateModal: (modals: Modal[]) => void;
}

const useModalStore = create<ModalState & Action>((set) => ({
  modals: [],
  pushModal: (modal: Modal) =>
    set((state) => {
      state.modals.push(modal);
      return { modals: [...state.modals, { ...modal }] };
    }),
  popModal: () =>
    set((state) => {
      state.modals.pop();
      return { modals: [...state.modals] };
    }),
  updateModal: (modals: Modal[]) => set(() => ({ modals })),
}));

export default useModalStore;
