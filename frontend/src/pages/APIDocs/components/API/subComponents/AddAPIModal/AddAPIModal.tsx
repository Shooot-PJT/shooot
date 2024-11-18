/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import usePopup from '../../../../../../hooks/usePopup';
import { AddAPIRequestBody, Participant } from '../../../../apis/api/types';
import { validateStringInput } from '../../../../utils/validators';
import Flexbox from '../../../../../../components/Flexbox';
import Typography from '../../../../../../components/Typography';
import Textfield from '../../../../../../components/Textfield';
import Button from '../../../../../../components/Button';
import { useNavBarStore } from '../../../../../../stores/navbarStore';
import { useGetParticipantList } from '../../../../reactQueries/api';
import { SelectBox, SelectBoxOption } from './SelectBox/SelectBox';

interface AddAPIModalProps {
  domainId: number;
  popHandler: () => void;
  addHandler: (info: AddAPIRequestBody) => void;
}

export const AddAPIModal = ({ popHandler, addHandler }: AddAPIModalProps) => {
  const popUp = usePopup();
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const url = useRef<HTMLInputElement>(null);

  const [managerId, setManagerId] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>([]);

  const currentProjectId = useNavBarStore((state) => state.project);

  const {
    data: participantList,
    isLoading,
    isError,
  } = useGetParticipantList({
    projectId: currentProjectId,
  });

  useEffect(() => {
    if (participantList && Array.isArray(participantList)) {
      const formattedParticipants = participantList.map((p: any) => ({
        id: p.participantId,
        nickname: p.nickname,
      }));
      setParticipants(formattedParticipants);
    } else {
      //
    }
    console.log('Participants:', participantList);
  }, [participantList]);

  const addAPI = () => {
    const validationTitleResult = validateStringInput(
      title.current!.value.trim(),
    );
    const validationDescriptionResult = validateStringInput(
      description.current!.value.trim(),
    );
    const validationUrlResult = validateStringInput(url.current!.value.trim());

    if (
      validationTitleResult !== true ||
      validationDescriptionResult !== true ||
      validationUrlResult !== true
    ) {
      popUp.push({
        title: 'API 추가 실패',
        type: 'fail',
        children: (
          <Flexbox flexDirections="col" style={{ gap: '2rem' }}>
            <Flexbox flexDirections="col" style={{ gap: '1rem' }}>
              {validationTitleResult !== true && (
                <Typography color="originalRed">
                  {`제목에 ${validationTitleResult}.`}
                </Typography>
              )}
              {validationDescriptionResult !== true && (
                <Typography color="originalRed">
                  {`설명에 ${validationDescriptionResult}.`}
                </Typography>
              )}
              {validationUrlResult !== true && (
                <Typography color="originalRed">
                  {`URL에 ${validationUrlResult}.`}
                </Typography>
              )}
            </Flexbox>
          </Flexbox>
        ),
      });
    } else {
      const apiData: AddAPIRequestBody = {
        title: title.current!.value.trim(),
        description: description.current!.value.trim(),
        url: url.current!.value.trim(),
        managerId: managerId !== '' ? Number(managerId) : null,
      };
      addHandler(apiData);
    }
  };

  if (isLoading) {
    return <Typography>참여자 목록을 불러오는 중입니다...</Typography>;
  }

  if (isError) {
    return <Typography>참여자 목록을 불러오는 데 실패했습니다.</Typography>;
  }

  const selectOptions: SelectBoxOption[] = [
    { label: <em>선택 안 함</em>, value: '' },
    ...participants.map((participant) => ({
      label: participant.nickname,
      value: participant.id.toString(),
    })),
  ];

  return (
    <Flexbox flexDirections="col" style={{ width: '100%', rowGap: '1rem' }}>
      <Typography size={1.25} weight="600">
        API 생성
      </Typography>

      <Flexbox flexDirections="col" style={{ width: '100%', rowGap: '1rem' }}>
        <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
          <Typography weight="600" size={0.875} color="disabled">
            담당자 선택
          </Typography>
          <SelectBox
            value={managerId}
            onChange={(value: string) => setManagerId(value)}
            options={selectOptions}
          />
        </Flexbox>
        <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
          <Typography weight="600" size={0.875} color="disabled">
            API 이름
          </Typography>
          <Textfield
            ref={title}
            ratio={5.5}
            size={2.5}
            fullWidth
            placeholder="API 이름을 입력해주세요."
            defaultValue=""
          />
        </Flexbox>

        <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
          <Typography weight="600" size={0.875} color="disabled">
            API 설명
          </Typography>
          <Textfield
            ref={description}
            ratio={5.5}
            size={2.5}
            fullWidth
            placeholder="API를 설명해주세요."
            defaultValue=""
          />
        </Flexbox>
        <Flexbox flexDirections="col" style={{ rowGap: '0.25rem' }}>
          <Typography weight="600" size={0.875} color="disabled">
            엔드포인트
          </Typography>
          <Textfield
            ref={url}
            ratio={5.5}
            size={2.5}
            fullWidth
            placeholder="/posts/{postId} 형태로 엔드포인트를 입력해주세요."
            defaultValue=""
          />
        </Flexbox>
      </Flexbox>

      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={popHandler}>
          취소
        </Button>
        <Button color="primary" onClick={() => addAPI()}>
          추가
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
