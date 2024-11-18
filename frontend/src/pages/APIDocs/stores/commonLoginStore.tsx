import { create } from 'zustand';

type CommonLoginStore = {
  session: string;
  setSession: (session: string) => void;
};

export const useCommonLoginStore = create<CommonLoginStore>()((set) => ({
  session: '',
  setSession: (session) => set(() => ({ session: session })),
}));
