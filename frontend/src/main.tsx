import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ModalPortal from './hooks/useModal/ModalPortal.tsx';
import PopupPortal from './hooks/usePopup/PopupPortal.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ModalPortal />
        <PopupPortal />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </>,
);
