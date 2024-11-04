import React, { ReactNode, Suspense } from 'react';
import * as style from './Layout.css';
import NavBar from '../NavBar';
import Flexbox from '../Flexbox';
import { Banner } from '../Banner';
import { ErrorBoundary } from 'react-error-boundary';
import { useResize } from '../../hooks/useResize';
import { useNavBar } from '../../pages/Main/hooks/useNavBar';

interface LayoutProps extends React.ComponentProps<'div'> {
  children: ReactNode;
}

export const Layout = ({ children, ...props }: LayoutProps) => {
  const { isLarge } = useResize();
  const {
    menu,
    userInfo,
    projectInfo,
    memberInfo,
    nicknameChangeModalHandler,
    addProjectModalHandler,
    editProjectModalHandler,
    inviteMembersModalHandler,
    kickMemberModalHandler,
  } = useNavBar();

  return (
    <div className={style.layout} {...props}>
      <NavBar>
        <NavBar.Title />
        <div className={style.nav}>
          <ErrorBoundary fallback={<>에러</>}>
            <Suspense fallback={<>로딩중</>}>
              <NavBar.Project addProjectModalHandler={addProjectModalHandler} />
            </Suspense>
          </ErrorBoundary>
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
          <Banner
            menu={menu}
            userInfo={userInfo!}
            projectInfo={projectInfo!}
            memberInfo={memberInfo!}
            nicknameChangeModalHandler={nicknameChangeModalHandler}
            editProjectModalHandler={editProjectModalHandler}
            inviteMembersModalHandler={inviteMembersModalHandler}
            kickMemberModalHandler={kickMemberModalHandler}
          />
          {children}
        </Flexbox>
      </div>
    </div>
  );
};
