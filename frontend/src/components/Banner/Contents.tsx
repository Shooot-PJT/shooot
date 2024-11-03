import Flexbox from '../Flexbox';
import { ProjectContents } from './ProjectContents';
import { UserContents } from './UserContents';
import { UserInfo } from '../../pages/Main/types';
import { ProjectInfo, ProjectMember } from '../../pages/MyProject/types';

interface ContentsProps {
  menu: number;
  userInfo: UserInfo;
  projectInfo: ProjectInfo;
  memberInfo: ProjectMember[];
  nicknameChangeModalHandler: () => void;
  editProjectModalHandler: () => void;
  inviteMembersModalHandler: () => void;
}

export const Contents = ({
  menu,
  userInfo,
  projectInfo,
  memberInfo,
  nicknameChangeModalHandler,
  editProjectModalHandler,
  inviteMembersModalHandler,
}: ContentsProps) => {
  return (
    <Flexbox
      flexDirections="col"
      justifyContents="center"
      style={{
        width: '100%',
        rowGap: '3rem',
      }}
    >
      {menu !== 2 ? (
        <ProjectContents
          projectInfo={projectInfo}
          memberInfo={memberInfo}
          editProjectModalHandler={editProjectModalHandler}
          inviteMembersModalHandler={inviteMembersModalHandler}
        />
      ) : (
        <UserContents
          userInfo={userInfo}
          handler={nicknameChangeModalHandler}
        />
      )}
    </Flexbox>
  );
};
