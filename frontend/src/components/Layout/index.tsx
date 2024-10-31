import React, { ReactNode } from 'react';
import * as style from './Layout.css';
import NavBar from '../NavBar';
import Flexbox from '../Flexbox';
import { Banner } from '../Banner';
import { ErrorBoundary } from 'react-error-boundary';
import { useResize } from '../../hooks/useResize';

interface LayoutProps extends React.ComponentProps<'div'> {
  children: ReactNode;
}

export const Layout = ({ children, ...props }: LayoutProps) => {
  const { isLarge } = useResize();

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
      <div style={{ width: '100%' }}>
        <Flexbox
          flexDirections="col"
          justifyContents="start"
          style={{
            width: '100%',
            rowGap: '1rem',
            paddingLeft: isLarge ? '21rem' : '0',
            paddingTop: isLarge ? '0' : '4rem',
          }}
        >
          <Banner />
          {children}
        </Flexbox>
      </div>
    </div>
  );
};
