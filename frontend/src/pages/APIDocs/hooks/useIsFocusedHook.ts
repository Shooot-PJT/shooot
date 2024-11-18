import { useState, Dispatch, SetStateAction } from 'react';

export type useIsFocusedHookReturnType = {
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  handleToggleIsFocused: () => void;
};

export type UseIsFocusedHookType = () => useIsFocusedHookReturnType;

const useIsFocusedHook = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleToggleIsFocused = () => setIsFocused((prev) => !prev);

  return { isFocused, setIsFocused, handleToggleIsFocused };
};

export default useIsFocusedHook;
