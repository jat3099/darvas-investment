// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Import HashRouter instead of BrowserRouter
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* 2. Use HashRouter here */}
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>,
);