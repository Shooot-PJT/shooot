import Flexbox from '../../../../../components/Flexbox';
import Typography from '../../../../../components/Typography';
import useModal from '../../../../../hooks/useModal';
import { ProjectMember } from '../../../../MyProject/types';
import Button from '../../../../../components/Button';
import { useEffect, useState } from 'react';
import { useNavBarStore } from '../../../../../stores/navbarStore';
import { removeMemberByProjectIdAndUserId } from '../../../apis/projectApis';

interface ConfirmKickModalProps {
  member: ProjectMember;
}

export const ConfirmKickModal = ({ member }: ConfirmKickModalProps) => {
  const modal = useModal();
  const navbarStore = useNavBarStore();
  const [popState, setPopState] = useState<boolean>(false);

  const kickHandler = async () => {
    await removeMemberByProjectIdAndUserId(
      navbarStore.project,
      member.userId,
    ).then(() => {
      setPopState(true);
      modal.pop();
    });
  };

  useEffect(() => {
    return () => {
      if (popState) modal.pop();
    };
  }, [popState]);

  return (
    <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
      {/* 타이틀 */}
      <Typography size={1.25} weight="600">
        팀원 추방
      </Typography>

      {/* 팀원 목록 */}
      <Typography>{member.nickname} 님을 추방하시겠습니까?</Typography>

      {/* 추방 버튼 */}
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button
          color="grey"
          onClick={() => {
            setPopState(false);
            modal.pop();
          }}
        >
          취소
        </Button>
        <Button onClick={async () => await kickHandler()}>추방</Button>
      </Flexbox>
    </Flexbox>
  );
};
