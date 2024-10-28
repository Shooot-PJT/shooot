import './App.css';

// import { API } from './pages/APIDocs/components/API/API';
import useModal from './hooks/useModal';
import darkTheme from './styles/darkTheme.css';
import { useNavBarStore } from './stores/navbarStore';
import { useEffect } from 'react';
import usePopup from './hooks/usePopup';
import Typography from './components/Typography';
import Button from './components/Button';
import Flexbox from './components/Flexbox';
import { Layout } from './components/Layout';
import { APIDocs } from './pages/APIDocs';

function App() {
  const modal = useModal();
  const popup = usePopup();
  const navbarStore = useNavBarStore();

  const handlePopup = () => {
    popup.push({
      title: '팝업입니다',
      children: (
        <>
          <Typography>내용입니다</Typography>
        </>
      ),
    });
  };

  const handleModal = () => {
    modal.push({
      children: (
        <Flexbox flexDirections="col">
          <Typography>내용입니다</Typography>
          <Button onClick={modal.pop}>닫기</Button>
          <Button onClick={handleModal}>모달추가</Button>
        </Flexbox>
      ),
      onClose: () => {
        console.log(
          '%c슛🚀',
          'color:#825cff; font-size: 2rem; font-weight: 800',
        );
      },
    });
  };

  useEffect(() => {
    console.log(navbarStore.project);
  }, [navbarStore.project]);

  useEffect(() => {
    console.log(navbarStore.menu);
  }, [navbarStore.menu]);

  return (
    <div className={darkTheme}>
      <Layout>
        <APIDocs />
        <Button
          onClick={handleModal}
          children="모달추가"
          rounded={0.5}
          paddingX={0.5}
          paddingY={0.25}
        />
        <Button
          onClick={handlePopup}
          children="팝업추가"
          rounded={0.5}
          paddingX={0.5}
          paddingY={0.25}
        />
      </Layout>
    </div>
  );
}

export default App;
