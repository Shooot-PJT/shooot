import React, { useState } from 'react';
import { useAddAPI } from '../../reactQueries/api';

interface AddAPIFormProps {
  domainId: number;
  onClose: () => void; // 폼 닫기 위한 콜백
}

const AddAPIForm: React.FC<AddAPIFormProps> = ({ domainId, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [managerId, setManagerId] = useState<number | null>(null); // 예시로 초기값 설정

  const addAPI = useAddAPI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || managerId === null) {
      alert('필수 항목을 입력해주세요.');
      return;
    }

    await addAPI.mutateAsync(
      {
        domainId,
        body: {
          title,
          description,
          url,
          managerId,
        },
      },
      {
        onSuccess: () => {
          onClose(); // 폼 닫기
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      <label>
        Manager ID:
        <input
          type="number"
          value={managerId || ''}
          onChange={(e) => setManagerId(Number(e.target.value))}
          required
        />
      </label>
      <button type="submit">추가</button>
      <button type="button" onClick={onClose}>
        취소
      </button>
    </form>
  );
};

export default AddAPIForm;
