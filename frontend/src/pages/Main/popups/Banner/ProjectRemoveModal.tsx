import Button from '../../../../components/Button';
import Flexbox from '../../../../components/Flexbox';
import Typography from '../../../../components/Typography';

interface ProjectRemoveModalProps {
  projectId: number;
  popHandler: () => void;
  removeHandler: (projectId: number) => void;
}

export const ProjectRemoveModal = ({
  projectId,
  popHandler,
  removeHandler,
}: ProjectRemoveModalProps) => {
  return (
    <Flexbox flexDirections="col" style={{ rowGap: '2rem' }}>
      <Typography size={1.25} weight="700">
        프로젝트 삭제
      </Typography>
      <Typography weight="700">정말 프로젝트를 삭제하시겠습니까?</Typography>
      <Flexbox justifyContents="end" style={{ columnGap: '1rem' }}>
        <Button color="grey" onClick={popHandler}>
          취소
        </Button>
        <Button color="delete" onClick={() => removeHandler(projectId)}>
          변경
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
