import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { Toaster } from 'react-hot-toast'

// Initialize theme from localStorage
if (typeof document !== 'undefined') {
  const saved = localStorage.getItem('theme') || 'dark'
  const html = document.documentElement
  html.setAttribute('data-theme', saved)
  html.classList.toggle('theme-light', saved === 'light')
  html.classList.toggle('theme-dark', saved === 'dark')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
