import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importiere die CSS-Datei für globales Styling
import App from './App'; // Importiere die Haupt-App-Komponente

const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendert die App-Komponente in das DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
