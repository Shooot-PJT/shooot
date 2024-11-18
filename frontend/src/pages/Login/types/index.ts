export interface LoginError {
  isError: boolean;
  errMsg: string;
}

export interface LoginHook {
  emailRef: React.RefObject<HTMLInputElement>;
  pwdRef: React.RefObject<HTMLInputElement>;
  loginError: LoginError;
  loginHandler: () => void;
}
