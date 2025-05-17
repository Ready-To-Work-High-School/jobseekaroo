
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PasswordResetRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have a hash with recovery token
    const hash = location.hash;
    
    if (hash && hash.includes("type=recovery") && hash.includes("access_token=")) {
      console.log("Recovery token detected in URL, redirecting to reset password page");
      
      // Redirect to the reset-password page with the same hash
      navigate(`/reset-password${hash}`);
    }
  }, [location.hash, navigate]);

  // This is a utility component that doesn't render anything
  return null;
};

export default PasswordResetRedirect;
