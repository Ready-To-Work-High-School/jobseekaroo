
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
      toast({
        title: "Error",
        description: error.message || "Invalid email or password",
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
      <EmailPasswordForm 
        onSubmit={handleEmailPasswordSubmit} 
        isLoading={isLoading} 
      />
      
      <div className="mt-6 mb-6">
        <Separator>
          <span className="px-2 text-xs text-muted-foreground">OR</span>
        </Separator>
      </div>
      
      <SocialAuthButtons 
        onAppleSignIn={handleAppleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        isAppleLoading={isAppleLoading}
        isGoogleLoading={isGoogleLoading}
        isFormLoading={isLoading}
      />
      
      <div className="mt-6 space-y-4">
        <SignInLinks />
        
        <Alert className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-sm">
            <span>Having trouble signing in? Please contact support.</span>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default SignInForm;
