import React, { ReactNode } from 'react';
import * as style from './Layout.css';
import NavBar from '../NavBar';
import Flexbox from '../Flexbox';
import { Banner } from '../Banner';
import * as global from '../../styles/globalStyle.css';

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
      <div className={global.desktopL} style={{ width: '100%' }}>
        <Flexbox
          flexDirections="col"
          justifyContents="start"
          style={{ width: '100%', rowGap: '1rem', paddingLeft: '21rem' }}
        >
          <Banner />
          {children}
        </Flexbox>
      </div>
      <div className={global.desktopS} style={{ width: '100%' }}>
        <Flexbox
          flexDirections="col"
          justifyContents="start"
          style={{ width: '100%', rowGap: '1rem', paddingTop: '4rem' }}
        >
          <Banner />
          {children}
        </Flexbox>
      </div>
    </div>
  );
};
