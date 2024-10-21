import { useState } from 'react';
import './App.css';
import Backdrop from './components/Backdrop';
import Typography from './components/Typography';
import darkTheme from './styles/darkTheme.css';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        백드랍
      </button>
      <Backdrop isOpen={isOpen}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          닫기
        </button>
        <div className={darkTheme}>
          <Typography color="secondary" weight="700" size={1.5}>
            hello
          </Typography>
        </div>
      </Backdrop>
    </>
  );
}

export default App;
