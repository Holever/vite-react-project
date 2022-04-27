import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root') ?? document.body).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);