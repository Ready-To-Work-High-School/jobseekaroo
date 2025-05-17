
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
    // Check if we have a token in the hash (from email link)
    const hash = location.hash;
    console.log("Reset password location hash:", hash);
    
    // Parse the hash fragment (skip the leading # character)
    const searchParams = new URLSearchParams(hash.substring(1));
    
    // Check for errors first
    const urlError = searchParams.get("error");
    const urlErrorDescription = searchParams.get("error_description");
    
    if (urlError && urlErrorDescription) {
      const readableError = urlErrorDescription.replace(/\+/g, ' ');
      onError(readableError);
      
      // Provide specific error messages based on error type
      if (urlError === "access_denied" && urlErrorDescription.includes("expired")) {
        toast({
          variant: "destructive",
          title: "Reset link expired",
          description: "Your password reset link has expired. Please request a new one.",
        });
        setTimeout(() => navigate("/forgot-password"), 5000);
      } else if (urlError === "invalid_request") {
        toast({
          variant: "destructive",
          title: "Invalid request",
          description: "There was a problem with your password reset request. Please try again.",
        });
        setTimeout(() => navigate("/forgot-password"), 4000);
      } else {
        toast({
          variant: "destructive",
          title: "Error with reset link",
          description: readableError,
        });
        setTimeout(() => navigate("/forgot-password"), 3000);
      }
      return;
    }
    
    // Check for access token presence
    const accessToken = searchParams.get("access_token");
    const type = searchParams.get("type");
    
    console.log("Access token found:", !!accessToken);
    console.log("Token type:", type);
    
    if (!accessToken) {
      toast({
        variant: "destructive",
        title: "Invalid reset link",
        description: "This password reset link appears to be invalid. Please request a new one.",
      });
      setTimeout(() => navigate("/forgot-password"), 3000);
      return;
    }
    
    // Valid token found
    toast({
      title: "Reset link valid",
      description: "You can now set your new password below.",
    });
    
  }, [location, navigate, onError]);

  return null;
};

export default PasswordResetTokenValidator;
