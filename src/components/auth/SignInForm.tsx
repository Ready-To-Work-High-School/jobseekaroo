
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import EmailPasswordForm, { SignInValues } from "./EmailPasswordForm";
import SocialAuthButtons from "./SocialAuthButtons";
import SignInLinks from "./SignInLinks";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signIn, signInWithApple, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleEmailPasswordSubmit = async (values: SignInValues) => {
    setIsLoading(true);
    try {
      await signIn(values.email, values.password);
      toast({
        title: "Success",
        description: "You have successfully signed in",
      });
      
      // Check if there's a redirect in the state from protected routes
      const from = location.state?.from?.pathname || '/';
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
      // Store current location to redirect back after login
      if (location.state?.from) {
        sessionStorage.setItem('redirectAfterLogin', location.state.from.pathname);
      }
      
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
      
      <div className="mt-6">
        <SignInLinks />
      </div>
    </div>
  );
};

export default SignInForm;
