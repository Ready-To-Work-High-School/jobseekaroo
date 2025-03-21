
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure we grab the root element and handle errors properly
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error("Failed to render application:", error);
  // Display a fallback error message in the DOM if possible
  const errorElement = document.createElement('div');
  errorElement.innerHTML = `<h1>Application Error</h1><p>Sorry, the application failed to load. Please check the console for details.</p>`;
  document.body.appendChild(errorElement);
}
