
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'
import { AuthProvider } from './contexts/auth'
import { Toaster as SonnerToaster } from 'sonner'
import { ThemeProvider } from './contexts/ThemeContext'

// Import styles (use dynamic import for non-critical CSS)
import './styles/index.css'

// Dynamically import less critical CSS to reduce parsing time at startup
const importNonCriticalCSS = async () => {
  const cssModules = [
    import('./styles/global.css'),
    import('./styles/mobile.css'),
    import('./styles/mobile-optimization.css'),
    import('./styles/animations.css')
  ];
  
  await Promise.all(cssModules);
};

// Add some fun console messages for teen developers
console.log(
  '%c👋 Welcome to JS4HS! 🚀', 
  'color: #3b82f6; font-size: 20px; font-weight: bold;'
)

// Measure initial page load performance
const measurePerf = () => {
  if (performance && performance.mark) {
    performance.mark('app-started');
    
    setTimeout(() => {
      performance.mark('app-interactive');
      if (performance.measure) {
        performance.measure('app-load-time', 'app-started', 'app-interactive');
        const loadTime = performance.getEntriesByName('app-load-time')[0];
        console.log(`App became interactive in ${Math.round(loadTime.duration)}ms`);
      }
    }, 0);
  }
};

measurePerf();

// Use createRoot with concurrent features
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
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
    </ThemeProvider>
  </React.StrictMode>,
);

// Import non-critical CSS after the app has loaded
if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(() => {
    importNonCriticalCSS();
  });
} else {
  setTimeout(importNonCriticalCSS, 200);
}

// Easter egg for curious teens
// Moved to after rendering to reduce main thread work during startup
setTimeout(() => {
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
}, 1000);
