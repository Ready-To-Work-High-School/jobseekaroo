
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/auth'
import { ThemeProvider } from './contexts/ThemeContext'

// Import styles
import './styles/index.css'
import './styles/global.css'
import './styles/mobile.css'
import './styles/mobile-optimization.css' // Add our new mobile optimizations

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
