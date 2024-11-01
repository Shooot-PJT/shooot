import Flexbox from '../Flexbox';
import { useNavBar } from '../../hooks/useNavBar';
import { ProjectContents } from './ProjectContents';
import { UserContents } from './UserContents';

export const Contents = () => {
  const {
    menu,
    userInfo,
    projectInfo,
    memberInfo,
    nicknameChangeModalHandler,
  } = useNavBar();

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
        <ProjectContents projectInfo={projectInfo} memberInfo={memberInfo} />
      ) : (
        <UserContents
          userInfo={userInfo}
          handler={nicknameChangeModalHandler}
        />
      )}
    </Flexbox>
  );
};
