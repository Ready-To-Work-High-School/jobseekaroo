
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface PasswordResetTokenValidatorProps {
  onError: (error: string) => void;
}

const PasswordResetTokenValidator = ({ onError }: PasswordResetTokenValidatorProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for URL errors and access token
    // First check for hash parameters (Supabase auth redirects use hash fragments)
    const searchParams = new URLSearchParams(location.hash.substring(1));
    const urlError = searchParams.get("error");
    const urlErrorDescription = searchParams.get("error_description");
    
    // Debug info for troubleshooting
    console.log("Location hash:", location.hash);
    console.log("Search params from hash:", Object.fromEntries(searchParams.entries()));
    
    if (urlError && urlErrorDescription) {
      const readableError = urlErrorDescription.replace(/\+/g, ' ');
      onError(readableError);
      toast({
        variant: "destructive",
        title: "Reset link error",
        description: readableError,
      });
      
      // If token expired, redirect to forgot password after a delay
      if (urlError === "access_denied" && urlErrorDescription.includes("expired")) {
        toast({
          title: "Link expired",
          description: "Your password reset link has expired. We'll redirect you to request a new one.",
        });
        setTimeout(() => navigate("/forgot-password"), 5000);
      }
    }
    
    // Also check for access_token to ensure we're on a valid reset page
    const hasAccessToken = searchParams.has("access_token");
    console.log("Has access token:", hasAccessToken);
    
    if (!hasAccessToken && !urlError) {
      toast({
        variant: "destructive",
        title: "Invalid reset link",
        description: "This password reset link appears to be invalid. Please request a new one.",
      });
      setTimeout(() => navigate("/forgot-password"), 3000);
    }
  }, [location, navigate, onError]);

  return null;
};

export default PasswordResetTokenValidator;
