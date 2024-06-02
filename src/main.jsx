import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseProvider } from './context/firebase.jsx'
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        <App />
        <Toaster richColors/>
      </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>
)
