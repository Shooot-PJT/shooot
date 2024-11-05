import { ReactNode } from 'react';
import { ErrorType } from '../stores/signupStore';

export interface SignupError {
  isError: boolean;
  errMsg: string;
}

export interface EmailResponse {
  isValid: boolean;
}

export interface HookProps {
  push: (
    title: string,
    children: ReactNode,
    type: 'success' | 'fail',
    onClose?: () => void,
  ) => void;
  error: (type: ErrorType, isError: boolean, errMsg: string) => void;
  nextStep: () => void;
}
