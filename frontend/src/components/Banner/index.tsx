import React, { ReactNode } from 'react';
import Flexbox from '../Flexbox';
import { Contents } from './Contents';
import { Img } from './Img';
import theme from '../../styles/theme.css';
import { useResize } from '../../hooks/useResize';
import { UserInfo } from '../../pages/Main/types';
import { ProjectInfo, ProjectMember } from '../../pages/MyProject/types';

interface BannerProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
  menu: number;
  userInfo: UserInfo;
  projectInfo: ProjectInfo;
  memberInfo: ProjectMember[];
  nicknameChangeModalHandler: () => void;
  editProjectModalHandler: () => void;
  inviteMembersModalHandler: () => void;
}

export const Banner = ({
  children,
  menu,
  userInfo,
  projectInfo,
  memberInfo,
  nicknameChangeModalHandler,
  editProjectModalHandler,
  inviteMembersModalHandler,
  ...props
}: BannerProps) => {
  const { isLarge } = useResize();
  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: isLarge ? '1rem 2rem 0 2rem' : '1rem 2rem',
        backgroundColor: theme.color.background['100'],
        borderRadius: isLarge ? '1rem' : '0',
      }}
    >
      <Flexbox
        justifyContents="between"
        style={{ width: '100%', columnGap: '6rem' }}
        {...props}
      >
        {isLarge && <Img src="woman" />}
        <Contents
          menu={menu}
          userInfo={userInfo}
          projectInfo={projectInfo}
          memberInfo={memberInfo}
          nicknameChangeModalHandler={nicknameChangeModalHandler}
          editProjectModalHandler={editProjectModalHandler}
          inviteMembersModalHandler={inviteMembersModalHandler}
        />
        <Img src="man" />
        {children}
      </Flexbox>
    </div>
  );
};
