
/**
 * Utility to prevent unauthorized copying/pasting of content and enhance security
 */

type CopyAttemptCallback = () => void;

// Add text protection to prevent unauthorized copying
export const enableTextProtection = (onCopyAttempt?: CopyAttemptCallback) => {
  // Prevent right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (onCopyAttempt) onCopyAttempt();
    return false;
  });

  // Prevent keyboard shortcuts for copy/paste
  document.addEventListener('keydown', (e) => {
    // Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+P
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'v' || e.key === 'p')) {
      e.preventDefault();
      if (onCopyAttempt) onCopyAttempt();
      return false;
    }
  });

  // Disable text selection
  const style = document.createElement('style');
  style.id = 'text-protection-style';
  style.innerHTML = `
    .protected-content {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;
  document.head.appendChild(style);
  
  // Monitor URL navigation without overriding native methods
  // Use event listeners instead of replacing native methods
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && isSuspiciousUrl(href)) {
        console.warn('Blocked navigation to suspicious URL:', href);
        e.preventDefault();
        if (onCopyAttempt) onCopyAttempt();
      }
    }
  });
  
  // Monitor and clean URLs
  cleanExistingLinks();
  observeNewLinks();
};

// Check for suspicious URLs
function isSuspiciousUrl(url: string): boolean {
  if (!url) return false;
  
  // Allow relative URLs and known safe domains
  if (url.startsWith('/') || 
      url.startsWith('http://localhost') || 
      url.startsWith('https://lovable.dev') ||
      url.startsWith('https://gpteng.co')) {
    return false;
  }
  
  // Common malware/phishing indicators
  const suspiciousPatterns = [
    /\.(ru|cn|tk|gq|ml|ga|cf)(\/.+|$)/, // Suspicious TLDs
    /bit\.ly/,
    /goo\.gl/,
    /tinyurl\.com/,
    /free\-?\s?(download|movie|game|software)/i,
    /win.*prize/i,
    /claim.*reward/i,
    /your.*computer.*infected/i,
    /password.*expired/i,
    /account.*suspend/i,
    /verify.*account/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url)) {
      return true;
    }
  }
  
  return false;
}

// Clean existing links in the document
function cleanExistingLinks() {
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && isSuspiciousUrl(href)) {
      console.warn('Removed suspicious link:', href);
      link.setAttribute('href', '#');
      link.setAttribute('data-blocked', 'true');
      link.addEventListener('click', (e) => e.preventDefault());
    }
  });
}

// Observe for new links being added to the DOM
function observeNewLinks() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            
            // Check if this is a link
            if (element.tagName === 'A') {
              const href = element.getAttribute('href');
              if (href && isSuspiciousUrl(href)) {
                console.warn('Blocked suspicious link:', href);
                element.setAttribute('href', '#');
                element.setAttribute('data-blocked', 'true');
                element.addEventListener('click', (e) => e.preventDefault());
              }
            }
            
            // Check child links
            element.querySelectorAll('a').forEach(link => {
              const href = link.getAttribute('href');
              if (href && isSuspiciousUrl(href)) {
                console.warn('Blocked suspicious link in new content:', href);
                link.setAttribute('href', '#');
                link.setAttribute('data-blocked', 'true');
                link.addEventListener('click', (e) => e.preventDefault());
              }
            });
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}

// Remove text protection
export const disableTextProtection = () => {
  document.removeEventListener('contextmenu', () => {});
  document.removeEventListener('keydown', () => {});
  const style = document.getElementById('text-protection-style');
  if (style) {
    document.head.removeChild(style);
  }
};

// Apply protection to specific element
export const protectElement = (element: HTMLElement, onCopyAttempt?: CopyAttemptCallback) => {
  if (element) {
    element.classList.add('protected-content');
    
    const preventWithCallback = (e: Event) => {
      e.preventDefault();
      if (onCopyAttempt) onCopyAttempt();
    };
    
    element.addEventListener('copy', preventWithCallback);
    element.addEventListener('cut', preventWithCallback);
    element.addEventListener('paste', preventWithCallback);
  }
};
