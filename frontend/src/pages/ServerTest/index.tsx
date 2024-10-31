import Button from '../../components/Button';
import useModal from '../../hooks/useModal';
import { AddProjectModal } from './components/AddProjectModal/AddProjectModal';

export const ServerTest = () => {
  const modal = useModal();

  const handleModal = () => {
    modal.push({
      children: <AddProjectModal />,
    });
  };

  return (
    <>
      <Button onClick={handleModal}>프로젝트 추가</Button>
    </>
  );
};
