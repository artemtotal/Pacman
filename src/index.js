import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importiere die CSS-Datei für globales Styling
import App from './App'; // Importiere die Haupt-App-Komponente

// Erstellen Sie das Root-Element, in dem die React-Anwendung gerendert wird
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendert die App-Komponente in das DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
