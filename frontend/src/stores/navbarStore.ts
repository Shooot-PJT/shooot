import { create } from 'zustand';

type NavBarState = {
  menu: number;
  isOpen: boolean;
  project: number;
};

type NavBarAction = {
  setMenu: (menu: NavBarState['menu']) => void;
  setIsOpen: (isOpen: NavBarState['isOpen']) => void;
  setProject: (project: number) => void;
  clear: () => void;
};

export const useNavBarStore = create<NavBarState & NavBarAction>()((set) => ({
  menu: sessionStorage.getItem('menu')
    ? Number(sessionStorage.getItem('menu'))
    : 2,
  isOpen: false,
  project: sessionStorage.getItem('project')
    ? Number(sessionStorage.getItem('project'))
    : 0,
  setMenu: (menu) => set(() => ({ menu: menu })),
  setIsOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
  setProject: (project) => set(() => ({ project: project })),
  clear: () => set(() => ({ menu: 2, project: 0 })),
}));
