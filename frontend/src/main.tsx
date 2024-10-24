import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ModalPortal from './hooks/useModal/ModalPortal.tsx';
import PopupPortal from './hooks/usePopup/PopupPortal.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalPortal />
    <PopupPortal />
    <App />
  </StrictMode>,
);
