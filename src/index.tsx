import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId='923830234556-ep3d7f54nitelcoq3epkjda4bdlt3ilv.apps.googleusercontent.com'>
    <HashRouter>
      <App />
    </HashRouter>
  </GoogleOAuthProvider>
);
