import React, { ReactNode } from 'react';
import * as global from '../../../../../styles/globalStyle.css';

interface DesktopProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export const Desktop = ({ children }: DesktopProps) => {
  return <div className={global.desktop}>{children}</div>;
};
