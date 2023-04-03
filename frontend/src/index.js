import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap-icons/font/bootstrap-icons.css";
import { ContactsContextProvider } from './context/ContactsContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContactsContextProvider>
        <App />
      </ContactsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);