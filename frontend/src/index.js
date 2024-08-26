import React from 'react';
import ReactDOM from 'react-dom/client'; // Importiere die neue API für ReactDOM
import './index.css';
import App from './App';

// Erstelle einen Root, indem du das neue createRoot verwendest
const root = ReactDOM.createRoot(document.getElementById('root'));

// Verwende root.render statt ReactDOM.render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
