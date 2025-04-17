
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/auth'
import { Toaster as SonnerToaster } from 'sonner'

// Import styles
import './styles/index.css'
import './styles/global.css'
import './styles/mobile.css'
import './styles/mobile-optimization.css'
import './styles/animations.css'

// Add some fun console messages for teen developers
console.log(
  '%c👋 Welcome to JS4HS! 🚀', 
  'color: #3b82f6; font-size: 20px; font-weight: bold;'
)
console.log(
  '%c🔍 Looking under the hood? You might have a future in web development!',
  'color: #10b981; font-size: 14px;'
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        {/* Modern toast notifications with animations */}
        <SonnerToaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'white',
              color: 'black',
              border: '1px solid #e2e8f0',
            },
            className: 'font-medium',
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

// Easter egg for curious teens
const funFacts = [
  "The first website ever created is still online!",
  "The Matrix code effect was created from Japanese sushi recipes.",
  "The first domain name ever registered was symbolics.com in 1985.",
  "Roughly 50% of all coding jobs are outside the tech industry.",
  "A 'bug' in programming came from an actual moth stuck in a computer.",
  "The average developer spends 30% of their time debugging."
];

// Add secret keyboard combination for teens to discover
let keys: string[] = [];
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

window.addEventListener('keydown', (e) => {
  keys.push(e.key);
  if (keys.length > konami.length) {
    keys.shift();
  }
  
  if (keys.join('') === konami.join('')) {
    console.log('%c🎮 CHEAT CODE ACTIVATED! 🎮', 'color: #ef4444; font-size: 20px; font-weight: bold;');
    console.log('%c💡 Fun Fact: ' + funFacts[Math.floor(Math.random() * funFacts.length)], 'color: #f59e0b; font-size: 16px;');
    keys = [];
  }
});
