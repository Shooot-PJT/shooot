import React, { ReactNode, Suspense } from 'react';
import * as style from './Layout.css';
import NavBar from '../NavBar';
import Flexbox from '../Flexbox';
import { Banner } from '../Banner';
import { ErrorBoundary } from 'react-error-boundary';
import { useResize } from '../../hooks/useResize';
import { useNavBar } from '../../pages/Main/hooks/useNavBar';
import Button from '../Button';
import Typography from '../Typography';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '../../pages/Main/apis';
import { useNavigate } from 'react-router-dom';
import usePopup from '../../hooks/usePopup';

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
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const popup = usePopup();

  const handleLogout = async () => {
    await logout()
      .then(() => {
        queryClient.clear();
        popup.push({
          title: '로그아웃',
          children: (
            <Typography>
              로그아웃 되었습니다.
              <br />
              로그인 페이지로 이동합니다.
            </Typography>
          ),
          onClose: () => nav('/auth/login'),
        });
      })
      .catch((err) => {
        console.log(err);
        popup.push({
          title: '로그아웃 실패',
          children: <Typography>다시 시도해주세요.</Typography>,
          type: 'fail',
        });
      });
  };

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
        <div style={{ width: '90%', margin: '5rem auto -2rem auto' }}>
          <Button
            color="grey"
            fullWidth
            paddingY={0.75}
            onClick={async () => await handleLogout()}
          >
            <Typography color="disabled" size={0.8125}>
              로그아웃
            </Typography>
          </Button>
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
