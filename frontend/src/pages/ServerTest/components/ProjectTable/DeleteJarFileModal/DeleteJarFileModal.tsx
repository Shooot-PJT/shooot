import Button from '../../../../../components/Button';
import Flexbox from '../../../../../components/Flexbox';
import Typography from '../../../../../components/Typography';
import useModal from '../../../../../hooks/useModal';
import { useUploadStateStore } from '../../../stores/useUploadStateStore';

interface DeleteJarFileModalProps {
  delFunction: () => void;
}

export const DeleteJarFileModal = ({
  delFunction,
}: DeleteJarFileModalProps) => {
  const modal = useModal();
  const { state } = useUploadStateStore();
  return (
    <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
      <Typography size={1.25} weight="700">
        프로젝트 파일 삭제
      </Typography>
      <div>
        <Typography weight="500">
          정말 프로젝트 파일을 삭제하시겠습니까?
        </Typography>
        <Typography size={0.875} color="delete">
          삭제한 프로젝트 파일은 복구할 수 없습니다.
        </Typography>
      </div>
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={() => modal.pop()}>
          취소
        </Button>
        <Button
          color="delete"
          onClick={() => delFunction()}
          disabled={state === 'Pending'}
        >
          삭제
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
