import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Something went wrong in DungeonForge</h1>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to measure performance, pass a function
reportWebVitals(console.log);