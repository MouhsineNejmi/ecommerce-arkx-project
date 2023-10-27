import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.css';

import { ThemeProvider } from './context/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
