// import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router';
import { AuthProvider, ReactQueryProvider } from './providers';

import 'animate.css';
import './css/index.css';
import { Toaster } from 'react-hot-toast';

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
