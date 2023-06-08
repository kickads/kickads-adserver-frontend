// import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './providers/AuthProvider';
import { AppRouter } from './router';

import './css/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  // </React.StrictMode>
);
