
import React, { useEffect, useRef } from 'react';
import { setupCSP, secureDomLinks } from '@/utils/security';

/**
 * Security provider component that applies various security measures
 * This should be included once near the root of your application
 */
const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialized = useRef(false);
  
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Setup Content Security Policy
    setupCSP();
    
    // Ensure all links use HTTPS
    secureDomLinks();
    
    // Log security initialization
    console.log('Security measures initialized');
  }, []);
  
  return <>{children}</>;
};

export default SecurityProvider;
