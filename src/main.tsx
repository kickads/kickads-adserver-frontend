// import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './router/AppRouter.tsx';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { ReactQueryProvider } from './providers/ReactQueryProvider.tsx';

import 'animate.css';
import './css/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ReactQueryProvider>
    <AuthProvider>
      <Toaster />
      <AppRouter />
    </AuthProvider>
  </ReactQueryProvider>
  // </React.StrictMode>
);
