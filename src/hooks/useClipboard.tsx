
import { useCallback } from 'react';

export function useClipboard() {
  const copyToClipboard = useCallback((text: string) => {
    // Create a temporary element
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    
    // Execute copy command
    document.execCommand('copy');
    
    // Remove temporary element
    document.body.removeChild(el);
    
    return true;
  }, []);
  
  return { copyToClipboard };
}
