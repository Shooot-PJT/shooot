import { create } from 'zustand';

type NavBarState = {
  menu: number;
  project: number;
  isOpen: boolean;
};

type NavBarAction = {
  setMenu: (menu: NavBarState['menu']) => void;
  setProject: (project: NavBarState['project']) => void;
  setIsOpen: (isOpen: NavBarState['isOpen']) => void;
};

export const useNavBarStore = create<NavBarState & NavBarAction>()((set) => ({
  menu: 0,
  project: 0,
  isOpen: false,
  setMenu: (menu) => set(() => ({ menu: menu })),
  setProject: (project) => set(() => ({ project: project })),
  setIsOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
}));
