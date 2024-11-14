import React, { useState } from 'react';
import Typography from '../../../../../../components/Typography';
import Button from '../../../../../../components/Button';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Method } from '../../../../types/methods';
import Flexbox from '../../../../../../components/Flexbox';
import { EditAPIRequestBody } from '../../../../apis/api/types';
import { APIRequestDocsInfo } from '../../API.data.types';

interface EditAPIModalProps {
  apiId: number;
  initialData: APIRequestDocsInfo;
  popHandler: () => void;
  editHandler: (info: EditAPIRequestBody) => void;
}

export const EditAPIModal: React.FC<EditAPIModalProps> = ({
  initialData,
  popHandler,
  editHandler,
}) => {
  const [method, setMethod] = useState<Method | null>(initialData.method);
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [url, setUrl] = useState(initialData.url);
  const [managerId, setManagerId] = useState<number | null>(
    initialData.managerId || null,
  );

  const handleSubmit = async () => {
    try {
      await editHandler({
        method,
        title,
        description,
        url,
        managerId,
      });
      popHandler();
    } catch (error) {
      console.error('Failed to edit API:', error);
    }
  };

  return (
    <Flexbox flexDirections="col" style={{ padding: '2rem', gap: '1rem' }}>
      <Typography size={1.5} weight="600">
        API 편집
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Method</InputLabel>
        <Select
          value={method || 'METHOD'}
          onChange={(e) =>
            setMethod(
              e.target.value === 'METHOD' ? null : (e.target.value as Method),
            )
          }
          label="Method"
        >
          <MenuItem value="METHOD">METHOD</MenuItem>
          <MenuItem value="GET">GET</MenuItem>
          <MenuItem value="POST">POST</MenuItem>
          <MenuItem value="PUT">PUT</MenuItem>
          <MenuItem value="DELETE">DELETE</MenuItem>
          <MenuItem value="PATCH">PATCH</MenuItem>
          {/* 필요한 다른 메서드 추가 */}
        </Select>
      </FormControl>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <TextField
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>담당자</InputLabel>
        <Select
          value={managerId || ''}
          onChange={(e) => {
            const value = e.target.value as string;
            setManagerId(value ? Number(value) : null);
          }}
          label="담당자"
        >
          <MenuItem value="">담당자 선택</MenuItem>
          <MenuItem value="1">Manager 1</MenuItem>
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
