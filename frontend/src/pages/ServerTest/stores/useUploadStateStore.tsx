import { create } from 'zustand';
import { UploadState } from '../types';

type UploadStoreState = {
  state: UploadState;
};

type UploadStateAction = {
  setState: (state: UploadState) => void;
};

export const useUploadStateStore = create<
  UploadStoreState & UploadStateAction
>()((set) => ({
  state: 'None',
  setState: (state) => set(() => ({ state })),
}));
