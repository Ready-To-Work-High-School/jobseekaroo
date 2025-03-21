
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root immediately without waiting for DOMContentLoaded
createRoot(document.getElementById("root")!).render(<App />);
