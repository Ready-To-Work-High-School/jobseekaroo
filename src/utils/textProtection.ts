
/**
 * Utility to prevent unauthorized copying/pasting of content
 */

// Add text protection to prevent unauthorized copying
export const enableTextProtection = () => {
  // Prevent right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent keyboard shortcuts for copy/paste
  document.addEventListener('keydown', (e) => {
    // Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+P
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'v' || e.key === 'p')) {
      e.preventDefault();
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
};

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
export const protectElement = (element: HTMLElement) => {
  if (element) {
    element.classList.add('protected-content');
    element.addEventListener('copy', (e) => e.preventDefault());
    element.addEventListener('cut', (e) => e.preventDefault());
    element.addEventListener('paste', (e) => e.preventDefault());
  }
};
