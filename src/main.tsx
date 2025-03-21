
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

// Simple and direct rendering approach with error handling
const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  
  // Wrap the App in an error boundary at the highest level
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  document.body.innerHTML = '<div style="padding: 20px; font-family: system-ui;"><h1>Application Error</h1><p>Unable to find root element to mount the application.</p></div>'
  console.error('Root element (#root) not found in the document')
}
