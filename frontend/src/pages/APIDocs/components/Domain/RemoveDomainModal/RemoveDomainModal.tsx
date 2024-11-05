import Typography from '../../../../../components/Typography';
import Flexbox from '../../../../../components/Flexbox';
import { DomainInfo } from '../Domain.data.types';
import Button from '../../../../../components/Button';
import { RemoveDomainRequest } from '../types/domain.types';

interface RemoveDomainModalProps {
  domainId: DomainInfo['domainId'];
  removeHandler: (domainId: RemoveDomainRequest) => void;
  popHandler: () => void;
}

export const RemoveDomainModal = ({
  domainId,
  removeHandler,
  popHandler,
}: RemoveDomainModalProps) => {
  return (
    <Flexbox flexDirections="col" style={{ width: '100%', rowGap: '1rem' }}>
      <Typography size={1.25} weight="600" color="originalRed">
        도메인 삭제
      </Typography>
      <Flexbox
        flexDirections="col"
        style={{ gap: '0.3rem', padding: '1.5rem 0rem' }}
      >
        <Typography>
          도메인 내에 포함된 모든 API, 테스트 케이스가 삭제되며
        </Typography>
        <Typography>삭제된 도메인은 복구할 수 없습니다.</Typography>
      </Flexbox>
      {/* 결과 */}
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={popHandler}>
          취소
        </Button>
        <Button color="delete" onClick={() => removeHandler!({ domainId })}>
          예, 삭제합니다.
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
