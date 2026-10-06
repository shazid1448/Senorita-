import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import { AudioProvider } from './context/AudioContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContentProvider>
      <LanguageProvider>
        <ThemeProvider>
          <AudioProvider>
            <App />
          </AudioProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ContentProvider>
  </React.StrictMode>
);
