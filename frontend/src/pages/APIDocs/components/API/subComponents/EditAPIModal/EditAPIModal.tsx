/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Typography from '../../../../../../components/Typography';
import Button from '../../../../../../components/Button';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Flexbox from '../../../../../../components/Flexbox';
import { EditAPIRequestBody, Participant } from '../../../../apis/api/types';
import { APIDetailInfo } from '../../../../types/data/API.data';
import { useGetParticipantList } from '../../../../reactQueries/api';
import { useNavBarStore } from '../../../../../../stores/navbarStore';
import { Method } from '../../../../types/methods';
import Textfield from '../../../../../../components/Textfield';

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
        method,
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

  return (
    <Flexbox flexDirections="col" style={{ padding: '2rem', gap: '1rem' }}>
      <Typography size={1.5} weight="600">
        API 편집
      </Typography>

      <Textfield
        label="API 이름"
        value={title}
        onChange={(e: {
          target: { value: React.SetStateAction<string | undefined> };
        }) => setTitle(e.target.value)}
        fullWidth
        color="secondary"
      />
      <Textfield
        label="API 설명"
        value={description}
        onChange={(e: {
          target: { value: React.SetStateAction<string | undefined> };
        }) => setDescription(e.target.value)}
        fullWidth
        color="secondary"
      />
      <Textfield
        label="URL"
        value={url as string}
        onChange={(e: {
          target: { value: React.SetStateAction<string | null | undefined> };
        }) => setUrl(e.target.value)}
        fullWidth
        color="secondary"
      />
      <FormControl fullWidth size="small">
        <InputLabel color="secondary">Method</InputLabel>

        <Select
          value={method || 'METHOD'}
          onChange={(e) =>
            setMethod(
              e.target.value === 'METHOD' ? null : (e.target.value as Method),
            )
          }
          label="Method"
          color="secondary"
          MenuProps={{
            PaperProps: {
              style: { maxHeight: 200, backgroundColor: '#f7f7f7' },
            },
          }}
        >
          <MenuItem>선택안함</MenuItem>
          <MenuItem value="get">GET</MenuItem>
          <MenuItem value="post">POST</MenuItem>
          <MenuItem value="put">PUT</MenuItem>
          <MenuItem value="delete">DELETE</MenuItem>
          <MenuItem value="patch">PATCH</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel color="secondary">담당자</InputLabel>
        <Select
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
          label="담당자"
          color="secondary"
          MenuProps={{
            PaperProps: {
              style: { maxHeight: 200, backgroundColor: '#f7f7f7' },
            },
          }}
        >
          <MenuItem value="">
            <em>선택 안 함</em>
          </MenuItem>
          {participants.map((participant) => (
            <MenuItem key={participant.id} value={participant.id.toString()}>
              {participant.nickname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Flexbox
        flexDirections="row"
        justifyContents="end"
        style={{ gap: '1rem', marginTop: '1rem' }}
      >
        <Button onClick={popHandler}>취소</Button>
        <Button onClick={handleSubmit} color="primary">
          저장
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
