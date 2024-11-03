import { useState } from 'react';
import Flexbox from '../../../../../components/Flexbox';
import Typography from '../../../../../components/Typography';
import Textfield from '../../../../../components/Textfield';
import Button from '../../../../../components/Button';
import Icon from '../../../../../components/Icon';
import { HiUser } from 'react-icons/hi2';
import { UserInfo, UserSearchResponse } from '../../../types';
import { Chip } from '../../../components/Chip';
import { findMember, sendInvitingMail } from '../../../apis';
import usePopup from '../../../../../hooks/usePopup';

interface InviteMembersModalProps {
  projectId: number;
  popHandler: () => void;
}

export const InviteMembersModal = ({
  projectId,
  popHandler,
}: InviteMembersModalProps) => {
  const popup = usePopup();
  const [result, setResult] = useState<UserSearchResponse | undefined>(
    undefined,
  );
  const [targets, setTargets] = useState<UserSearchResponse[]>([]);

  const searchMember = async (email: string) => {
    await findMember(email)
      .then((res) => {
        setResult(() => ({
          userId: res.data.userId,
          nickname: res.data.nickname,
          email: res.data.email,
        }));
      })
      .catch(() => setResult(undefined));
  };
  const addTarget = (info: UserSearchResponse) => {
    setTargets((prev) => {
      const before = [...prev];
      before.push(info);
      return before;
    });
  };
  const exceptTarget = (idx: number) => {
    setTargets((prev) => {
      const before = [...prev];
      before.splice(idx, 1);
      return before;
    });
  };
  const sendMail = async () => {
    targets.forEach(async (t: UserSearchResponse, idx: number) => {
      await sendInvitingMail(projectId, t.userId)
        .then(() => {
          if (idx + 1 === targets.length) {
            popup.push({
              title: '메일 전송',
              children: <Typography>초대 메일을 전송하였습니다.</Typography>,
              onClose: () => popHandler(),
            });
          }
        })
        .catch(() => {
          popup.push({
            title: '메일 전송 실패',
            children: (
              <Typography color="delete">
                메일 전송에 실패하였습니다.
              </Typography>
            ),
            type: 'fail',
          });
        });
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
          사용자 검색
        </Typography>

        <div style={{ width: '100%' }}>
          {/* 이메일 입력*/}
          <Textfield fullWidth onChange={(e) => searchMember(e.target.value)} />

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
                  <Typography size={0.875}>닉네임입니다</Typography>
                  <Typography color="disabled" size={0.8125}>
                    ssafy@ssafy.com
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
        <Button color="grey" rounded={0.5} onClick={popHandler}>
          <Typography weight="600" size={0.875}>
            취소
          </Typography>
        </Button>
        <Button
          color="primary"
          rounded={0.5}
          onClick={async () => await sendMail()}
        >
          <Typography weight="600" size={0.875}>
            초대 메일 전송
          </Typography>
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
