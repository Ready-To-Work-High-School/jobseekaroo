
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
      
      // Provide specific error messages based on error type
      if (urlError === "access_denied") {
        if (urlErrorDescription.includes("expired")) {
          toast({
            variant: "destructive",
            title: "Reset link expired",
            description: "Your password reset link has expired. We'll redirect you to request a new one.",
          });
          setTimeout(() => navigate("/forgot-password"), 5000);
        } else {
          toast({
            variant: "destructive",
            title: "Access denied",
            description: readableError,
          });
        }
      } else if (urlError === "invalid_request") {
        toast({
          variant: "destructive",
          title: "Invalid request",
          description: "There was a problem with your password reset request. Please try again with a new reset link.",
        });
        setTimeout(() => navigate("/forgot-password"), 4000);
      } else if (urlError === "server_error") {
        toast({
          variant: "destructive",
          title: "Server error",
          description: "Our authentication server encountered an error. Please try again later.",
        });
        setTimeout(() => navigate("/forgot-password"), 4000);
      } else {
        toast({
          variant: "destructive",
          title: "Reset link error",
          description: readableError,
        });
      }
    }
    
    // Check for access_token to ensure we're on a valid reset page
    const hasAccessToken = searchParams.has("access_token");
    console.log("Has access token:", hasAccessToken);
    
    if (!hasAccessToken && !urlError) {
      // No token and no error means this is an invalid reset attempt
      toast({
        variant: "destructive",
        title: "Invalid reset link",
        description: "This password reset link appears to be invalid. Please request a new one.",
      });
      setTimeout(() => navigate("/forgot-password"), 3000);
    } else if (hasAccessToken) {
      // Valid token found, show confirmation to user
      toast({
        title: "Reset link valid",
        description: "You can now set your new password below.",
      });
    }
  }, [location, navigate, onError]);

  return null;
};

export default PasswordResetTokenValidator;
