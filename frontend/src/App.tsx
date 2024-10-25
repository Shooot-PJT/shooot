import './App.css';

// import { API } from './pages/APIDocs/components/API/API';
import useModal from './hooks/useModal';
import darkTheme from './styles/darkTheme.css';
import NavBar from './components/NavBar';
import { useNavBarStore } from './stores/navbarStore';
import { Desktop } from './components/Layout/Desktop';
import { Mobile } from './components/Layout/Mobile';
import { useEffect } from 'react';
import usePopup from './hooks/usePopup';
import Typography from './components/Typography';
import { APIDocs } from './pages/APIDocs';
import Button from './components/Button';
import { Banner } from './components/Banner';
import Flexbox from './components/Flexbox';
import * as s from './Tmp.css';
import theme from './styles/theme.css';

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
    <div className={darkTheme} style={{ width: '100%', height: '100%' }}>
      {/* <div
        className="TEMPORAL-LAYOUT"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.25rem',
        }}
      >
        <NavBar>
          <Desktop>
            <NavBar.Title title="제목" />
            <NavBar.Project project={[0, 1, 2]} />
            <NavBar.Menu />
          </Desktop>
          <Mobile>
            <NavBar.Title title="제목" />
            {navbarStore.isOpen && (
              <>
                <NavBar.Project project={[0, 1, 2]} />
                <NavBar.Menu />
              </>
            )}
          </Mobile>
        </NavBar>
        <APIDocs />
        <div
          style={{
            position: 'fixed',
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            left: '50%',
            bottom: '10%',
          }}
        >
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
        </div>
      </div> */}
      <NavBar>
        <NavBar.Title />
        <div className={s.nav}>
          <NavBar.Project project={[0, 1, 2]} />
          <div className={s.divi} />
          <NavBar.Menu />
        </div>
      </NavBar>
    </div>
  );
}

export default App;
