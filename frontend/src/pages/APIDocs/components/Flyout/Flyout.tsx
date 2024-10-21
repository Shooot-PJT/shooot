import { ReactNode } from 'react';
import { useFlyOutStore } from './Flyout.store';

//컴파운드 패턴 예시용

interface FlyOutProps {
  children: ReactNode;
}

export function FlyOut({ children }: FlyOutProps) {
  return <div>{children}</div>;
}

FlyOut.Toggle = function Toggle() {
  const toggle = useFlyOutStore((state) => state.toggle);

  return <div onClick={toggle}>ㅋㅋ</div>;
};

FlyOut.List = function List({ children }: { children: ReactNode }) {
  const open = useFlyOutStore((state) => state.open);

  return open ? <ul>{children}</ul> : null;
};

FlyOut.Item = function Item({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
};
