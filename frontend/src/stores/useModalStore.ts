import { create } from 'zustand';
import { ModalData } from '../components/Modal/Modal.types';

interface ModalState {
  modals: ModalData[];
}

interface Action {
  pushModal: (modal: ModalData) => void;
  popModal: () => void;
  updateModal: () => void;
}

const useModalStore = create<ModalState & Action>((set) => ({
  modals: [],
  pushModal: (modal: ModalData) =>
    set((state) => {
      return { modals: [...state.modals, { ...modal }] };
    }),
  popModal: () =>
    set((state) => {
      const updatedModals = state.modals.slice(0, -1);
      return { modals: updatedModals };
    }),

  updateModal: () =>
    set((state) => {
      const updatedModals = state.modals.map((modal, index) => {
        if (index === state.modals.length - 1) {
          return { ...modal, isClosing: true };
        }
        return modal;
      });
      return { modals: updatedModals };
    }),
}));

export default useModalStore;
