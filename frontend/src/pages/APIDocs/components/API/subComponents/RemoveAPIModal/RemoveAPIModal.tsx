import React from 'react';
import Typography from '../../../../../../components/Typography';
import Flexbox from '../../../../../../components/Flexbox';
import Button from '../../../../../../components/Button';
import { RemoveAPIRequest } from '../../../../apis/api/types';
import { APIDetailInfo } from '../../../../types/data/API.data';

interface RemoveAPIModalProps {
  apiId: APIDetailInfo['requestDocs']['id'];
  removeHandler: (request: RemoveAPIRequest) => void;
  popHandler: () => void;
}

export const RemoveAPIModal: React.FC<RemoveAPIModalProps> = ({
  apiId,
  removeHandler,
  popHandler,
}) => {
  return (
    <Flexbox flexDirections="col" style={{ width: '100%', rowGap: '1rem' }}>
      <Typography size={1.25} weight="600" color="originalRed">
        API 삭제
      </Typography>
      <Flexbox
        flexDirections="col"
        style={{ gap: '0.3rem', padding: '1.5rem 0rem' }}
      >
        <Typography>
          이 API를 삭제하면, 관련된 모든 테스트 케이스가 함께 삭제됩니다.
        </Typography>
        <Typography>삭제된 API는 복구할 수 없습니다.</Typography>
      </Flexbox>
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={popHandler}>
          취소
        </Button>
        <Button color="delete" onClick={() => removeHandler({ apiId })}>
          예, 삭제합니다.
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
