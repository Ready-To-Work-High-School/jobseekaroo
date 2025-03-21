
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Wait for the deviceready event before bootstrapping the app
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById("root")!).render(<App />);
});
