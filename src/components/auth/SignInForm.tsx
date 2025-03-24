
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
      console.error(error);
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
      // Note: No need to show success toast or navigate since OAuth redirects
    } catch (error: any) {
      console.error(error);
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
      await signInWithGoogle();
      // Note: No need to show success toast or navigate since OAuth redirects
    } catch (error: any) {
      console.error(error);
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
