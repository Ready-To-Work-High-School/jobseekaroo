
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import EmailPasswordForm, { SignInValues } from "./EmailPasswordForm";
import SocialAuthButtons from "./SocialAuthButtons";
import SignInLinks from "./SignInLinks";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { signIn, signInWithApple, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirectUrl from location state
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Store the current location on component mount
  useEffect(() => {
    // Store current path to redirect back after login
    if (location.state?.from) {
      sessionStorage.setItem('redirectAfterLogin', location.state.from.pathname);
    } else {
      sessionStorage.setItem('redirectAfterLogin', '/dashboard');
    }
  }, [location]);
  
  const handleEmailPasswordSubmit = async (values: SignInValues) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      await signIn(values.email, values.password);
      toast({
        title: "Success",
        description: "You have successfully signed in",
      });
      
      // Check if there's a redirect in the state from protected routes
      navigate(from);
    } catch (error: any) {
      console.error("Sign in error:", error);
      
      // Provide more helpful error messages based on the error
      let errorMessage = "An unexpected error occurred during sign in";
      
      if (error.message?.includes("auth/invalid-login-credentials") || 
          error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.message?.includes("auth/user-not-found")) {
        errorMessage = "No account found with this email. Please check your email or create a new account.";
      } else if (error.message?.includes("auth/wrong-password")) {
        errorMessage = "Incorrect password. Please try again or reset your password.";
      } else if (error.message?.includes("auth/too-many-requests")) {
        errorMessage = "Too many failed login attempts. Please try again later or reset your password.";
      } else if (error.message?.includes("auth/user-disabled")) {
        errorMessage = "This account has been disabled. Please contact support.";
      } else if (error.message?.includes("auth/network-request-failed")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.message?.includes("throttled") || error.message?.includes("rate limit")) {
        errorMessage = "Too many sign-in attempts. Please wait a few minutes and try again.";
      }
      
      setAuthError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsAppleLoading(true);
    try {
      console.log("Initiating Apple sign-in from SignInForm");
      await signInWithApple();
      // OAuth redirects will happen automatically
      // Success toast will be shown after redirect completes
    } catch (error: any) {
      console.error("Apple sign-in error:", error);
      toast({
        title: "Error",
        description: error.message || "Could not sign in with Apple",
        variant: "destructive",
      });
      setIsAppleLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      console.log("Initiating Google sign-in from SignInForm");
      // getCurrentPath is just a debug log to verify the path
      const currentPath = window.location.pathname;
      console.log("Current path before Google login:", currentPath);
            
      await signInWithGoogle();
      // OAuth redirects will happen automatically
    } catch (error: any) {
      console.error("Google sign-in error in form:", error);
      toast({
        title: "Error",
        description: error.message || "Could not sign in with Google",
        variant: "destructive",
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="bg-card border rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
      {authError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}
      
      <EmailPasswordForm 
        onSubmit={handleEmailPasswordSubmit} 
        isLoading={isLoading} 
      />
      
      <div className="mt-6 mb-6">
        <Separator className="mb-6">
          <span className="mx-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
        </Separator>

        <SocialAuthButtons 
          onGoogleSignIn={handleGoogleSignIn}
          onAppleSignIn={handleAppleSignIn}
          isGoogleLoading={isGoogleLoading}
          isAppleLoading={isAppleLoading}
        />
      </div>
      
      <SignInLinks />
    </div>
  );
};

export default SignInForm;
