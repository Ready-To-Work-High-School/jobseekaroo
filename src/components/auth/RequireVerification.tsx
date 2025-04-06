import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// This component checks if the user has gone through verification
// If not, it redirects to the verification page
const RequireVerification: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [hasVerified, setHasVerified] = useState<boolean>(() => {
    // Check if user has verified in this session
    return sessionStorage.getItem('identityVerified') === 'true';
  });

  useEffect(() => {
    // Check verification status when the component mounts
    const verificationStatus = sessionStorage.getItem('identityVerified') === 'true';
    
    if (!verificationStatus && location.pathname !== '/verify-identity') {
      toast.info("Please verify your identity to continue");
    }
    
    setHasVerified(verificationStatus);
  }, [location.pathname]);

  // If on the verification page, render normally
  if (location.pathname === '/verify-identity') {
    return <>{children}</>;
  }

  // If verified, render the protected content
  if (hasVerified) {
    return <>{children}</>;
  }

  // Otherwise, redirect to verification
  return <Navigate to="/verify-identity" state={{ from: location }} replace />;
};

export default RequireVerification;
