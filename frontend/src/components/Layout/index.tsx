import React, { ReactNode } from 'react';
import * as style from './Layout.css';
import NavBar from '../NavBar';
import Flexbox from '../Flexbox';
import { Banner } from '../Banner';

interface LayoutProps extends React.ComponentProps<'div'> {
  children: ReactNode;
}

export const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <div className={style.layout} {...props}>
      <NavBar>
        <NavBar.Title />
        <div className={style.nav}>
          <NavBar.Project project={[0, 1, 2]} />
          <div className={style.divi} />
          <NavBar.Menu />
        </div>
      </NavBar>
      <Flexbox
        flexDirections="col"
        justifyContents="start"
        style={{ width: '100%', rowGap: '1rem' }}
      >
        <Banner />
        {children}
      </Flexbox>
    </div>
  );
};
