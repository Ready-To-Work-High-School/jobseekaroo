
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ensureHttps, isSafeUrl } from '@/utils/security';

/**
 * Secure link component that ensures all external URLs use HTTPS
 * and validates URLs are safe
 */
interface SecureLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  href?: string;
  children: React.ReactNode;
}

const SecureLink: React.FC<SecureLinkProps> = ({ to, href, children, ...props }) => {
  // For internal links, use React Router's Link component
  if (to) {
    return <RouterLink to={to} {...props}>{children}</RouterLink>;
  }
  
  // For external links, ensure HTTPS and add security attributes
  if (href) {
    const secureHref = ensureHttps(href);
    
    // Check if URL is safe
    if (!isSafeUrl(secureHref)) {
      console.warn('Potentially unsafe URL blocked:', href);
      return <span className="text-red-500">[Unsafe URL removed]</span>;
    }
    
    // For external links, add security attributes
    const isExternal = secureHref.startsWith('http') && !secureHref.includes(window.location.hostname);
    
    if (isExternal) {
      return (
        <a 
          href={secureHref}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }
    
    // For internal absolute URLs, just ensure they're secure
    return <a href={secureHref} {...props}>{children}</a>;
  }
  
  // Fallback for when neither to nor href is provided
  return <span {...props}>{children}</span>;
};

export default SecureLink;
