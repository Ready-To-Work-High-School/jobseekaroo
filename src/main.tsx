
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root with a null check to ensure the element exists
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
