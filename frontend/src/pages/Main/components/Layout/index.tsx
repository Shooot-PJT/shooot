import React, { ReactNode, Suspense } from 'react';
import * as style from './Layout.css';
import NavBar from '../NavBar';
import { Banner } from '../Banner';
import { ErrorBoundary } from 'react-error-boundary';
import { useResize } from '../../../../hooks/useResize';
import Button from '../../../../components/Button';
import { useRemoveUserInfo } from '../../hooks';
import Typography from '../../../../components/Typography';
import Flexbox from '../../../../components/Flexbox';

interface LayoutProps extends React.ComponentProps<'div'> {
  children: ReactNode;
}

export const Layout = ({ children, ...props }: LayoutProps) => {
  const { isLarge } = useResize();
  const { mutate } = useRemoveUserInfo();

  return (
    <div className={style.layout} {...props}>
      <NavBar>
        <NavBar.Title />
        <div className={style.nav}>
          <ErrorBoundary fallback={<>에러</>}>
            <Suspense fallback={<>로딩중</>}>
              <NavBar.Project />
            </Suspense>
          </ErrorBoundary>
          <div className={style.divi} />
          <NavBar.Menu />
        </div>
        {isLarge && (
          <div style={{ width: '90%', margin: '5rem auto -2rem auto' }}>
            <Button
              color="grey"
              fullWidth
              paddingY={0.75}
              onClick={() => mutate()}
            >
              <Typography color="disabled" size={0.8125}>
                로그아웃
              </Typography>
            </Button>
          </div>
        )}
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
