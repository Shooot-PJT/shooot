import { create } from 'zustand';
import { SignupError } from '../types';

//========== 회원가입 상에 에러 관리
export type ErrorType = 'email' | 'code' | 'password' | 'nickname';
type ErrorState = {
  email: SignupError;
  code: SignupError;
  password: SignupError;
  nickname: SignupError;
};
type ErrorAction = {
  setError: (type: ErrorType, err: SignupError) => void;
};

export const useErrorStore = create<ErrorState & ErrorAction>()((set) => ({
  email: { isError: false, errMsg: '' },
  code: { isError: false, errMsg: '' },
  password: { isError: false, errMsg: '' },
  nickname: { isError: false, errMsg: '' },
  setError: (type, err) => set(() => ({ [type]: err })),
}));

//========== 회원가입 단계 관리
type Step = {
  step: number;
  nextStep: () => void;
};

export const useStepStore = create<Step>()((set) => ({
  step: 0,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
}));
