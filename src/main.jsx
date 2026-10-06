import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import { AudioProvider } from './context/AudioContext';

import ErrorBoundary from './components/common/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ContentProvider>
        <LanguageProvider>
          <ThemeProvider>
            <AudioProvider>
              <App />
            </AudioProvider>
          </ThemeProvider>
        </LanguageProvider>
      </ContentProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
