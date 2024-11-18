/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Typography from '../../../../../../components/Typography';
import Button from '../../../../../../components/Button';
import Flexbox from '../../../../../../components/Flexbox';
import { EditAPIRequestBody, Participant } from '../../../../apis/api/types';
import { APIDetailInfo } from '../../../../types/data/API.data';
import { useGetParticipantList } from '../../../../reactQueries/api';
import { useNavBarStore } from '../../../../../../stores/navbarStore';
import Textfield from '../../../../../../components/Textfield';
import { SelectBox, SelectBoxOption } from '../AddAPIModal/SelectBox/SelectBox';
import { Method } from '../../../../types/methods';

interface EditAPIModalProps {
  apiId: number;
  initialData: APIDetailInfo['requestDocs'];
  popHandler: () => void;
  editHandler: (info: EditAPIRequestBody) => void;
}

export const EditAPIModal: React.FC<EditAPIModalProps> = ({
  initialData,
  popHandler,
  editHandler,
}) => {
  const [method, setMethod] = useState(initialData.method);
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [url, setUrl] = useState(initialData.url);
  const [managerId, setManagerId] = useState<string>(
    initialData.managerId ? initialData.managerId.toString() : '',
  );
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
    }
  }, [participantList]);

  const handleSubmit = async () => {
    try {
      await editHandler({
        method: method || null,
        title: title?.trim(),
        description: description?.trim(),
        url: url?.trim(),
        managerId: managerId ? Number(managerId) : null,
      });
      popHandler();
    } catch (error) {
      console.error('Failed to edit API:', error);
    }
  };

  if (isLoading) {
    return <Typography>참여자 목록을 불러오는 중입니다...</Typography>;
  }

  if (isError) {
    return <Typography>참여자 목록을 불러오는 데 실패했습니다.</Typography>;
  }

  const methodOptions: SelectBoxOption[] = [
    { label: <em>선택 안 함</em>, value: '' },
    { label: 'GET', value: 'get' },
    { label: 'POST', value: 'post' },
    { label: 'PUT', value: 'put' },
    { label: 'DELETE', value: 'delete' },
    { label: 'PATCH', value: 'patch' },
  ];

  const managerOptions: SelectBoxOption[] = [
    ...participants.map((participant) => ({
      label: participant.nickname,
      value: participant.id.toString(),
    })),
  ];

  return (
    <Flexbox
      flexDirections="col"
      style={{ padding: '2rem', gap: '1rem', width: '100%' }}
    >
      <Typography size={1.5} weight="600">
        API 편집
      </Typography>
      <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
        <Typography weight="600" size={0.875} color="disabled">
          Method
        </Typography>
        <SelectBox
          value={method as string}
          onChange={(value: string) => setMethod(value as Method)}
          options={methodOptions}
        />
      </Flexbox>

      <Flexbox flexDirections="col" style={{ gap: '0.25rem' }}>
        <Typography weight="600" size={0.875} color="disabled">
          담당자
        </Typography>
        <SelectBox
          value={managerId}
          onChange={(value: string) => setManagerId(value)}
          options={managerOptions}
        />
      </Flexbox>
      <Textfield
        label="API 이름"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        fullWidth
        color="secondary"
      />
      <Textfield
        label="API 설명"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        fullWidth
        color="secondary"
      />
      <Textfield
        label="URL"
        value={url as string}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUrl(e.target.value)
        }
        fullWidth
        color="secondary"
      />

      <Flexbox
        flexDirections="row"
        justifyContents="end"
        style={{ gap: '1rem', marginTop: '1rem' }}
      >
        <Button color={'grey'} onClick={popHandler}>
          취소
        </Button>
        <Button onClick={handleSubmit} color="primary">
          저장
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
