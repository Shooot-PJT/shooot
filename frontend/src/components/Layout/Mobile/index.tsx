import React, { ReactNode } from 'react';
import * as global from '../../../styles/globalStyle.css';

interface MobileProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export const Mobile = ({ children }: MobileProps) => {
  return <div className={global.mobile}>{children}</div>;
};
