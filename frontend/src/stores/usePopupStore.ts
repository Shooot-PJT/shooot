import { create } from 'zustand';
import { PopupData } from '../components/Popup/Popup.types';

interface PopupState {
  popups: PopupData[];
}

interface Action {
  pushPopup: (popup: PopupData) => void;
  popPopup: () => void;
  updatePopup: () => void;
}

const usePopupStore = create<PopupState & Action>((set) => ({
  popups: [],
  pushPopup: (popup: PopupData) =>
    set((state) => {
      return { popups: [...state.popups, { ...popup }] };
    }),
  popPopup: () =>
    set((state) => {
      const updatedPopups = state.popups.slice(0, -1);
      return { popups: updatedPopups };
    }),
  updatePopup: () =>
    set((state) => {
      const updatedPopups = state.popups.map((popup, index) => {
        if (index === state.popups.length - 1) {
          return { ...popup, isClosing: true };
        }
        return popup;
      });
      return { popups: updatedPopups };
    }),
}));

export default usePopupStore;
