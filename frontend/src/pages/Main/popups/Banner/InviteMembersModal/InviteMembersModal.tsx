import { useState } from 'react';
import Flexbox from '../../../../../components/Flexbox';
import Typography from '../../../../../components/Typography';
import Textfield from '../../../../../components/Textfield';
import Button from '../../../../../components/Button';
import Icon from '../../../../../components/Icon';
import { HiUser } from 'react-icons/hi2';
import { UserInfo } from '../../../types';
import { Chip } from '../../../components/Chip';
import usePopup from '../../../../../hooks/usePopup';
import { ProjectMember } from '../../../../MyProject/types';
import {
  useApiHandler,
  useReadMembersByProjectId,
  useReadUserInfo,
} from '../../../hooks';
import { useNavBarStore } from '../../../../../stores/navbarStore';
import useModal from '../../../../../hooks/useModal';
import { validateEmail } from '../../../../Signup/utils/validator';

export const InviteMembersModal = () => {
  /* 필요 정보 */
  const popup = usePopup();
  const modal = useModal();
  const navbarStore = useNavBarStore();
  const { user } = useReadUserInfo();
  const { members } = useReadMembersByProjectId(navbarStore.project);
  const { searchMember, sendInvitingMail } = useApiHandler();

  /* 자원 관리 */
  const [result, setResult] = useState<UserInfo | undefined>(undefined);
  const [targets, setTargets] = useState<UserInfo[]>([]);

  const addTarget = (info: UserInfo) => {
    if (info.email === user?.data.email) {
      popup.push({
        title: '팀원 초대',
        children: <Typography>본인은 초대할 수 없습니다.</Typography>,
        type: 'fail',
      });
    } else {
      let res = true;
      members?.data.forEach((member: ProjectMember) => {
        if (member.email === info.email) res = false;
      });

      if (res) {
        setTargets((prev) => {
          const before = [...prev];
          before.push(info);
          return before;
        });
      } else {
        popup.push({
          title: '팀원 초대',
          children: <Typography>이미 소속된 팀원입니다.</Typography>,
          type: 'fail',
        });
      }
    }
  };
  const exceptTarget = (idx: number) => {
    setTargets((prev) => {
      const before = [...prev];
      before.splice(idx, 1);
      return before;
    });
  };

  return (
    <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
      {/* 타이틀 */}
      <Typography size={1.25} weight="700">
        팀원 초대
      </Typography>

      {/* 사용자 검색 */}
      <Flexbox flexDirections="col" style={{ rowGap: '0.5rem' }}>
        <Typography color="disabled" size={0.875} weight="500">
          이메일로 사용자 검색
        </Typography>

        <div style={{ width: '100%' }}>
          {/* 이메일 입력*/}
          <Textfield
            fullWidth
            onChange={async (e) => {
              if (!validateEmail(e.target.value.trim()).isError) {
                const member = await searchMember(e.target.value);
                setResult(() => member);
              }
            }}
            placeholder="초대할 사람의 이메일을 입력해주세요"
          />

          {/* 검색 결과 */}
          {result && (
            <Flexbox
              justifyContents="between"
              alignItems="center"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '1rem 0.5rem',
              }}
            >
              <Flexbox alignItems="center" style={{ columnGap: '0.5rem' }}>
                <Icon color="primary">
                  <HiUser />
                </Icon>
                <Flexbox flexDirections="col">
                  <Typography size={0.875}>{result.nickname}</Typography>
                  <Typography color="disabled" size={0.8125}>
                    {result.email}
                  </Typography>
                </Flexbox>
              </Flexbox>
              <Button rounded={0.5} onClick={() => addTarget(result)}>
                <Typography weight="600" size={0.85}>
                  추가
                </Typography>
              </Button>
            </Flexbox>
          )}
        </div>
      </Flexbox>

      {/* 초대 목록 */}
      {targets.length >= 0 && (
        <Flexbox flexDirections="col" style={{ rowGap: '0.5rem' }}>
          <Typography color="disabled" size={0.875} weight="500">
            초대 목록
          </Typography>
          <Flexbox style={{ width: '100%', flexWrap: 'wrap', gap: '0.25rem' }}>
            {targets.map((t: UserInfo, idx: number) => (
              <Chip key={idx} info={t} onClick={() => exceptTarget(idx)} />
            ))}
          </Flexbox>
        </Flexbox>
      )}

      {/* 메일 전송 */}
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" rounded={0.5} onClick={() => modal.pop()}>
          <Typography weight="600" size={0.875}>
            취소
          </Typography>
        </Button>
        <Button
          color="primary"
          rounded={0.5}
          onClick={async () =>
            await sendInvitingMail(navbarStore.project, targets)
          }
        >
          <Typography weight="600" size={0.875}>
            초대 메일 전송
          </Typography>
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
